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

  // ... rest of the component
  return (
    <div>
      <h1>Payment Successful</h1>
      <p>
        Thank you for your purchase!{" "}
        <button
          onClick={() => {
            navigate("/fileUpload");
          }}
        >
          Upload Files
        </button>
      </p>
    </div>
  );
}
