import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FileUploader() {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user updated:", selectedUser);
    }
  }, [selectedUser]);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }
    if (selectedUser.credits > 1) {
      const newTotalCredits = selectedUser.credits - 1;
      const newCredits = await updateCredits({ credits: newTotalCredits });
      setUser({ ...selectedUser, credits: newCredits });
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
        })
        .catch((error) => {
          console.error(error);
          setText("Error extracting text");
        });
    } else {
      setTimeout(() => {
        navigate("/purchase");
      }, 0);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileInputChange} />
        <button type="submit">Upload</button>
      </form>
      <textarea value={text} readOnly></textarea>
    </div>
  );
}
