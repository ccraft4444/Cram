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

router.post("/create-checkout-session", async (req, res) => {
  const { tier } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1MvpaqFQGhTdTKMrJgYDYhON",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json(session); // Return the session object as JSON instead of redirecting
});

module.exports = router;
