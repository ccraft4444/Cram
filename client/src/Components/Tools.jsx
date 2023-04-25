import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./fileUpload.css";
import { Link } from "react-router-dom";
import "./tools.css";

export default function Tools({ onRouteChange, studyGuide }) {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("study guide in tools", studyGuide);

  useEffect(() => {
    setText(studyGuide);
    console.log("use eff text tools", text);
  }, [studyGuide]);

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="tools">
      <div className="links">
        <Link to="/fileupload">Upload</Link>
        <Link to="/tools">Tools</Link>
      </div>
      <button
        className="button"
        onClick={async () => {
          if (!text) {
            setError("No file uploaded");
          } else if (selectedUser.credits > 1) {
            const newTotalCredits = selectedUser.credits - 1;
            const newCredits = await updateCredits({
              credits: newTotalCredits,
            });
            setUser({ ...selectedUser, credits: newCredits });
            onRouteChange("flashcard");
            setTimeout(() => {
              navigate("/loading");
            }, 0);
          } else {
            setTimeout(() => {
              navigate("/purchase");
            }, 0);
          }
        }}
      >
        Generate Flashcards *logo* 1
      </button>
      <button
        className="button"
        onClick={async () => {
          if (!text) {
            setError("No file uploaded");
            console.log(error);
          } else if (selectedUser.credits > 2) {
            const newTotalCredits = selectedUser.credits - 2;
            const newCredits = await updateCredits({
              credits: newTotalCredits,
            });
            setUser({ ...selectedUser, credits: newCredits });
            onRouteChange("prediction");

            setTimeout(() => {
              navigate("/loading");
            }, 0);
          } else {
            setTimeout(() => {
              navigate("/purchase");
            }, 0);
          }
        }}
      >
        Generate Test Prediction *logo* 2
      </button>
      <button className="button" onClick={() => navigate("/purchase")}>
        Purchase Credits
      </button>
    </div>
  );
}
