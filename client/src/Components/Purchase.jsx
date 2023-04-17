import { useState } from "react";
import Stripe from "stripe";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"; // Import axios for API requests

export default function Purchase() {
  const { selectedUser, updateCredits, fetchMe, setUser, loginUser } =
    useAuth();
  const [selectedTier, setSelectedTier] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("successful order");
      setMessage("Order placed! You will receive an email confirmation.");
      // Update credits here
      const tierIndex = parseInt(query.get("tierIndex"));
      if (!isNaN(tierIndex)) {
        setSelectedTier(tierIndex);
        handlePurchase(tierIndex);
      }
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  //  price id's: 10: price_1MvpbeFQGhTdTKMrYIpCsYGz
  // 5: price_1MvpbIFQGhTdTKMrmjHGF4h2
  // 1: price_1MvpaqFQGhTdTKMrJgYDYhON

  const onCheckout = async (tier) => {
    // Create a new checkout session
    const response = await axios.post(
      "/routes/payments/create-checkout-session",
      {
        priceId: tier.priceId,
        tierIndex: selectedTier, // pass the selected tier index to the server
        userId: selectedUser.id,
      }
    );
    console.log(
      "userId in oncheckiut:",
      selectedUser.id,
      "tierIndex in oncheckout:",
      selectedTier
    );
    const session = response.data;
    window.location.href = session.url;
  };

  const tiers = [
    {
      name: "Basic",
      price: 0.99,
      credits: 1,
      priceId: "price_1MvpaqFQGhTdTKMrJgYDYhON",
    },
    {
      name: "Pro",
      price: 3.99,
      credits: 5,
      priceId: "price_1MvpbIFQGhTdTKMrmjHGF4h2",
    },
    {
      name: "Premium",
      price: 6.99,
      credits: 10,
      priceId: "price_1MvpbeFQGhTdTKMrYIpCsYGz",
    },
  ];

  const handleTierSelection = (index) => {
    setSelectedTier(index);
  };

  const handlePurchase = async (tierIndex) => {
    const tier = tiers[tierIndex];

    // Create a new payment intent with the selected tier price

    const newTotalCredits = selectedUser.credits + tier.credits;
    const newCredits = await updateCredits({ credits: newTotalCredits });
    const updatedUser = await fetchMe();
    setUser(updatedUser);
    // setUser({ ...selectedUser, credits: newTotalCredits });

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
            onCheckout(tiers[selectedTier]);
            // navigate("/upload");
          }}
        >
          Purchase
        </button>
      )}
    </div>
  );
}
