const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const stripe = require("stripe")(
  "sk_test_51MtxiHFQGhTdTKMrIoEm62jgVUkbMeHBhQlH6qD6OfTk3zOW5lioPvPQhGeKMgTPiUY0mAcfohEfEnRvyqxcveJI005zotch9J"
);

const YOUR_DOMAIN = "http://localhost:4242";

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

router.post("/create-checkout-session", async (req, res) => {
  const { priceId, tierIndex } = req.body;
  console.log("priceId in back", priceId);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/success?tierIndex=${tierIndex}`, // pass tierIndex in the success_url
    cancel_url: `http://localhost:5173/purchase`,
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

module.exports = router;
