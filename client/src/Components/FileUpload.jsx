import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./fileUpload.css";
import { Link } from "react-router-dom";

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
        console.log("extracted text", extractedText);
        const trimmedText = extractedText.trim();
        setText(extractedText);
        // setFileUploaded(true);
        console.log("text", text);
        onStudyGuideChange(trimmedText, () => {
          navigate("/tools");
        });
        // onStudyGuideChange(trimmedText);
        // setTimeout(() => {
        //   navigate("/tools");
        // }, 0);
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
          <div className="links">
            <Link to="/fileupload" className="text">
              Upload
            </Link>
            <Link to="/tools" className="text10">
              Tools
            </Link>
          </div>

          <form onSubmit={handleFormSubmit}>
            <input type="file" onChange={handleFileInputChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
}
