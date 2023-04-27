import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading({ onResponseChange, studyGuide, route }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("sg in loading", studyGuide);
    async function fetchData() {
      const result = await axios.post(`/routes/langChain/${route}`, {
        studyGuide,
      });
      onResponseChange(result.data);
    }
    fetchData();
    navTime();
  }, [studyGuide, route]);

  function navTime() {
    setTimeout(() => {
      navigate("/response");
    }, 5000);
  }

  return (
    <>
      <h1>Cramming in progress</h1>

      <div className="row"></div>

      <p>
        Sit tight while our systems analyze your documents and build your custom
        tools
      </p>
      <p>Join Discord for Support</p>
    </>
  );
}
