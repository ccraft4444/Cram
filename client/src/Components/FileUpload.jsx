import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./fileUpload.css";

export default function FileUploader({ onStudyGuideChange, onRouteChange }) {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [error, setError] = useState("");
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
      <div className="primaryContainer">
        <div className="uploadForm">
          <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileInputChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
        <div className="secondaryContainer">
          <div className="userInfo">
            <div>{selectedUser.email}</div>
            <div>Credits: {selectedUser.credits}</div>
          </div>
          <div className="tools">
            <>Tools</>
            <button
              className="button"
              onClick={async () => {
                if (!fileUploaded) {
                  setError("No file uploaded");
                } else if (selectedUser.credits > 1) {
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
              className="button"
              onClick={async () => {
                if (!fileUploaded) {
                  setError("No file uploaded");
                } else if (selectedUser.credits > 2) {
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
            <button className="button" onClick={() => navigate("/purchase")}>
              Purchase Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
