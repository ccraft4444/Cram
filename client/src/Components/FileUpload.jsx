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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  // const handleFileInputChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!selectedFile) {
  //     return;
  //   }
  //   console.log("selected user", selectedUser);

  //   const formData = new FormData();
  //   formData.append("pdfFile", selectedFile);

  //   fetch("/routes/documents/extract-text", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.text();
  //     })
  //     .then((extractedText) => {
  //       console.log("extracted text", extractedText);
  //       const trimmedText = extractedText.trim();
  //       setText(extractedText);
  //       // setFileUploaded(true);
  //       console.log("text", text);
  //       onStudyGuideChange(trimmedText, () => {
  //         navigate("/tools");
  //       });
  //       // onStudyGuideChange(trimmedText);
  //       // setTimeout(() => {
  //       //   navigate("/tools");
  //       // }, 0);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setText("Error extracting text");
  //     });
  // };

  const handleFileInputChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      return;
    }

    const formData = new FormData();

    // Append each file to the FormData
    selectedFiles.forEach((file, index) => {
      formData.append(`pdfFile${index}`, file);
    });

    fetch("/routes/documents/extract-text", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text(); // Use response.text() instead of response.json()
      })
      .then((extractedText) => {
        console.log("Extracted texts:", extractedText);

        // Now you have an array of extracted texts, you can process them as needed
        onStudyGuideChange(extractedText, () => {
          navigate("/tools");
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Error extracting text");
      });
  };

  return (
    <div>
      <div className="primaryContainer">
        <div className="uploadForm">
          <div className="links">
            {/* <Link to="/fileupload" className="text">
              Upload
            </Link>
            <Link to="/tools" className="text10">
              Tools
            </Link> */}
            <div className="selected1">Upload</div>
            <div className="not-selected">Tools</div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div>Drag and Drop file to upload</div>
            {/* <div className="upload-container"> */}
            <input
              className="inp"
              type="file"
              onChange={handleFileInputChange}
              accept="application/pdf"
              multiple
            />
            {/* </div> */}
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
}
