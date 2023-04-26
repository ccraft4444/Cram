import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./fileUpload.css";
import { Link } from "react-router-dom";
import "./tools.css";

export default function Tools({ onRouteChange, studyGuide, onTotalChange }) {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [toolSelected, setToolSelected] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  let totalPrice = 0;
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

  function handleChange() {
    if (!isChecked) {
      totalPrice += 1;
    } else if (isChecked) {
      totalPrice -= 1;
    }
    setIsChecked(!isChecked);
  }

  function handleChange2() {
    if (!isChecked2) {
      totalPrice += 2;
    } else if (isChecked2) {
      totalPrice -= 2;
    }
    setIsChecked2(!isChecked2);
  }

  return (
    <div className="big">
      <div className="tools">
        <div className="links">
          <Link to="/fileupload">Upload</Link>
          <Link to="/tools">Tools</Link>
        </div>

        <div className="row">
          <div>Credit Balance: {selectedUser.credits}</div>
        </div>

        <div className="row">
          <div>Flashcards</div>
          <input type="checkbox" checked={isChecked} onChange={handleChange} />
        </div>

        {/* <button
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
      </button> */}
        <div className="row">
          <div>Test Prediction 2</div>
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={handleChange2}
          />
        </div>

        {(isChecked == true || isChecked2 == true) &&
        selectedUser.credits > totalPrice ? (
          <button
            className="button"
            onClick={async () => {
              const newTotalCredits = selectedUser.credits - totalPrice;
              const newCredits = await updateCredits({
                credits: newTotalCredits,
              });
              setUser({ ...selectedUser, credits: newCredits });
              if (isChecked == true && isChecked2 == true) {
                onRouteChange("both");
              } else if (isChecked == falase && isChecked2 == true) {
                onRouteChange("prediction");
              } else {
                onRouteChange("flashcard");
              }

              setTimeout(() => {
                navigate("/loading");
              }, 0);
            }}
          >
            Start Cramming
          </button>
        ) : (
          <button className="button" onClick={() => navigate("/purchase")}>
            Purchase Credits
          </button>
        )}
      </div>
    </div>
  );
}
