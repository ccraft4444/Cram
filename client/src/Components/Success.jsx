import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const { selectedUser, updateCredits, fetchMe, setUser } = useAuth();
  const navigate = useNavigate();
  const [tierIndex, setTierIndex] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("successful order");
      setMessage("Order placed! You will receive an email confirmation.");
      setIsPurchased(true);

      const tierIndexFromUrl = query.get("tierIndex");
      if (tierIndexFromUrl) {
        setTierIndex(parseInt(tierIndexFromUrl));
      }
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handlePurchase = async () => {
    if (selectedUser && tierIndex !== null) {
      const tier = tiers[tierIndex];

      const newTotalCredits = selectedUser.credits + tier.credits;
      const newCredits = await updateCredits({ credits: newTotalCredits });

      // Refresh user information after updating the credits
      const updatedUser = await fetchMe();
      setUser(updatedUser);

      console.log("updated user", updatedUser);
      setTimeout(() => {
        navigate("/upload");
      }, 0);
    } else {
      console.error("User data is not available");
    }
  };
  // ... rest of the component
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>
        Thank you for your purchase! Collect your credits{" "}
        <button
          onClick={() => {
            handlePurchase();
            // navigate("/upload");
          }}
        >
          Collect
        </button>
      </p>
    </div>
  );
}
