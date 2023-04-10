import { useState } from "react";
import Stripe from "stripe";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const stripe = new Stripe(
  "sk_test_51MtxiHFQGhTdTKMrIoEm62jgVUkbMeHBhQlH6qD6OfTk3zOW5lioPvPQhGeKMgTPiUY0mAcfohEfEnRvyqxcveJI005zotch9J"
);

export default function Purchase() {
  const { selectedUser, updateCredits, fetchMe, setUser, loginUser } =
    useAuth();
  const [selectedTier, setSelectedTier] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  const tiers = [
    { name: "Basic", price: 10, credits: 100 },
    { name: "Pro", price: 25, credits: 250 },
    { name: "Premium", price: 50, credits: 500 },
  ];

  const handleTierSelection = (index) => {
    setSelectedTier(index);
  };

  const handlePurchase = async () => {
    const tier = tiers[selectedTier];

    // Create a new payment intent with the selected tier price
    const paymentIntent = await stripe.paymentIntents.create({
      amount: tier.price * 100,
      currency: "usd",
      description: `${tier.name} credits`,
    });

    // const newTotalCredits = currentCredits + tier.credits;
    // currentCredits = newTotalCredits;
    const newTotalCredits = selectedUser.credits + tier.credits;
    const newCredits = await updateCredits({ credits: newTotalCredits });
    setUser({ ...selectedUser, credits: newTotalCredits });
    // loginUser({ email: selectedUser.email, password: selectedUser.password });
    console.log("selected user", selectedUser);
    setTimeout(() => {
      navigate("/upload");
    }, 0);
    // Redirect the user to the Stripe checkout page

    // window.location.href = paymentIntent.charges.data[0].receipt_url;

    // Send purchase request to server with selected tier info
  };

  return (
    <div>
      <h2>Select a credit package:</h2>
      {tiers.map((tier, index) => (
        <div
          key={index}
          onClick={() => handleTierSelection(index)}
          style={{
            backgroundColor: index === selectedTier ? "#ccc" : "#fff",
            padding: 10,
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <h3>{tier.name}</h3>
          <p>{tier.credits} credits</p>
          <p>${tier.price}</p>
        </div>
      ))}
      {selectedTier !== null && (
        <button
          onClick={() => {
            handlePurchase();
            // navigate("/upload");
          }}
        >
          Purchase
        </button>
      )}
    </div>
  );
}
