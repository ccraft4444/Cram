import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Thanks for your order!</h2>
      <h4>Your payment is successful.</h4>
      <p>
        We appreciate your business! If you have any questions, please email us
        at
        <a href="mailto:orders@example.com">orders@example.com</a>.
        <a>
          Get to studying:{" "}
          <button onClick={() => navigate("/fileupload")}>Upload File</button>
        </a>
      </p>
      <div></div>
    </>
  );
}

export default Success;
