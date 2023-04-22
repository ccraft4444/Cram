/* global process */

import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function FileUploader({ onStudyGuideChange, onRouteChange }) {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function genFlash() {
    const flashCards = await axios.post("/routes/langChain/flashcard", {
      studyGuide: text,
    });
    setResponse(flashCards);
  }

  async function genPrediction() {
    const prediction = await axios.post("/routes/langChain/prediction", {
      studyGuide: text,
    });
    console.log("prediction", prediction);
    setResponse(prediction);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }
    // const newTotalCredits = selectedUser.credits - 1;
    // const newCredits = await updateCredits({ credits: newTotalCredits });
    // setUser({ ...selectedUser, credits: newCredits });
    console.log("selected user", selectedUser);

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);

    fetch("/routes/documents/extract-text", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text();
      })
      .then((extractedText) => {
        setText(extractedText.trim());
        setFileUploaded(true);
      })
      .catch((error) => {
        console.error(error);
        setText("Error extracting text");
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">Upload</button>
        <div>
          <div>{selectedUser.email}</div>
          <div>Credits: {selectedUser.credits}</div>
        </div>
        {fileUploaded ? (
          <>
            <>Tools</>
            <button
              onClick={async () => {
                if (selectedUser.credits > 1) {
                  const newTotalCredits = selectedUser.credits - 1;
                  const newCredits = await updateCredits({
                    credits: newTotalCredits,
                  });
                  setUser({ ...selectedUser, credits: newCredits });
                  onStudyGuideChange(text);
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
              onClick={async () => {
                if (selectedUser.credits > 2) {
                  const newTotalCredits = selectedUser.credits - 2;
                  const newCredits = await updateCredits({
                    credits: newTotalCredits,
                  });
                  setUser({ ...selectedUser, credits: newCredits });
                  onStudyGuideChange(text);
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
          </>
        ) : null}
      </form>
      <textarea value={response} readOnly></textarea>

      <button onClick={() => navigate("/purchase")}>Purchase Credits</button>
    </div>
  );
}
