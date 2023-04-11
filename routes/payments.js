const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");

// Add CORS middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post(
  "/create-checkout-session",
  asyncErrorHandler(async (req, res) => {
    const { tier } = req.body;
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "USD",
              tier_data: {
                name: tier.name,
              },
              unit_amount: tier.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:5000/success",
        cancel_url: "http://localhost:5000/cancel",
      });
      console.log("Session created: ", session);
      console.log("Sending JSON response: ", { url: session.url });
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the Stripe session" });
    }
  })
);

module.exports = router;
