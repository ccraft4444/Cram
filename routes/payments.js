const router = require("express").Router();
const express = require("express");
const bodyParser = require("body-parser");
const { asyncErrorHandler } = require("./utils");
const stripe = require("stripe")(
  "sk_test_51MtxiHFQGhTdTKMrIoEm62jgVUkbMeHBhQlH6qD6OfTk3zOW5lioPvPQhGeKMgTPiUY0mAcfohEfEnRvyqxcveJI005zotch9J"
);
const endpointSecret =
  "whsec_0b1225300b7c656a6c1ecfd095c0f23821b19ba181c00f601791ec65ffa1ce7d";
const YOUR_DOMAIN = "http://localhost:4242";

router.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Add CORS middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//  price id's: 10: price_1MvpbeFQGhTdTKMrYIpCsYGz
// 5: price_1MvpbIFQGhTdTKMrmjHGF4h2
// 1: price_1MvpaqFQGhTdTKMrJgYDYhON
// ${YOUR_DOMAIN}?canceled=true

// router.post("/create-checkout-session", async (req, res) => {
//   const { priceId, tierIndex } = req.body;
//   console.log("priceId in back", priceId);
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: priceId,
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `http://localhost:5174/success?tierIndex=${tierIndex}`, // pass tierIndex in the success_url
//     cancel_url: `http://localhost:5174/purchase`,
//   });

//   res.json(session);
// });

router.post("/create-checkout-session", async (req, res) => {
  const { priceId, tierIndex, user } = req.body;
  console.log("priceId in back", priceId);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      user,
      tierIndex,
    },
    success_url: `http://localhost:5174/success?tierIndex=${tierIndex}`, // pass tierIndex in the success_url
    cancel_url: `http://localhost:5174/purchase`,
  });

  res.json(session);
});

router.post(
  "/success",
  asyncErrorHandler(async (req, res) => {
    const { tier } = req.body;
    // update the user's credits based on the selected tier
    const newTotalCredits = req.user.credits + tier.credits;
    req.user.credits = newTotalCredits;
    await req.user.save();
    res.sendStatus(200);
  })
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        console.log("**** constructing event ****");
        event = stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `!!!!! Poop Poop PaymentIntent for ${paymentIntent.amount} was successful!`
        );

        const sessionId = paymentIntent.metadata.checkoutSessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const { user, tierIndex } = session.metadata;

        // Move the function outside of the switch statement
        async function handlePaymentIntentSucceeded(
          paymentIntent,
          user,
          tierIndex
        ) {
          console.log("!!!!! in handlepaymentintent");
          const updatedUser = await prisma.users.update({
            where: {
              id: user.id,
            },
            data: { credits: user.credits + tierIndex },
          });
          console.log(updatedUser);
        }

        // Call the function
        handlePaymentIntentSucceeded(paymentIntent, user, tierIndex);

        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

module.exports = router;
