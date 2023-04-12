import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests

const ProductDisplay = ({ onCheckout }) => (
  <section>
    <div className="product">{/* ... */}</div>
    <button onClick={onCheckout}>Checkout</button> // Use onClick instead of a
    form
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function StripeTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      // Update credits here
      updateCredits();
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    // Create a new checkout session
    const response = await axios.post(
      "/routes/payments/create-checkout-session"
    );
    const session = response.data;
    window.location.href = session.url;
  };

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay onCheckout={onCheckout} />
  );
}
