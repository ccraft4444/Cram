import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const { OpenAI } = require("langchain/llms/openai");

const model = new OpenAI({ temperature: 0.9 });
const template = "Return flashcard set... {studyGuide}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["studyGuide"],
});

const chain = new LLMChain({ llm: model, prompt: prompt });

export default function FileUploader() {
  const { fetchMe, updateCredits, selectedUser, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
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

  const generateResponse = async () => {
    const res = await chain.call({ studyGuide: text });
    console.log(res);
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
          setFileUploaded(true);
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
        {fileUploaded ? (
          <button onClick={() => generateResponse()}>
            Generate Flashcards
          </button>
        ) : null}
      </form>
      <textarea value={text} readOnly></textarea>
      <button onClick={() => navigate("/purchase")}>Purchase Credits</button>
    </div>
  );
}
