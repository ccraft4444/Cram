/* global process */

import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// const model = new OpenAI({ temperature: 0.9 });
// const template = "Return flashcard set... {studyGuide}?";
// const prompt = new PromptTemplate({
//   template: template,
//   inputVariables: ["studyGuide"],
// });

// const model1 = new OpenAI({ temperature: 0.9 });
// const template1 = "Return test prediction... {studyGuide}?";
// const prompt1 = new PromptTemplate({
//   template: template1,
//   inputVariables: ["studyGuide"],
// });

// const chain = new LLMChain({ llm: model, prompt: prompt });
// const chain1 = new LLMChain({ llm: model1, prompt: prompt1 });

export default function FileUploader() {
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

  // const generateResponse = async () => {
  //   const res = await chain.call({ studyGuide: text });
  //   console.log(res);
  //   return res;
  // };

  // const generateResponse1 = async () => {
  //   const res = await chain1.call({ studyGuide: text });
  //   console.log(res);
  //   return res;
  // };

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
        {fileUploaded ? (
          <>
            <button
              onClick={async () => {
                if (selectedUser.credits > 1) {
                  const newTotalCredits = selectedUser.credits - 1;
                  const newCredits = await updateCredits({
                    credits: newTotalCredits,
                  });
                  setUser({ ...selectedUser, credits: newCredits });

                  genFlash();
                } else {
                  setTimeout(() => {
                    navigate("/purchase");
                  }, 0);
                }
              }}
            >
              Generate Flashcards
            </button>
            <button
              onClick={async () => {
                if (selectedUser.credits > 2) {
                  const newTotalCredits = selectedUser.credits - 2;
                  const newCredits = await updateCredits({
                    credits: newTotalCredits,
                  });
                  setUser({ ...selectedUser, credits: newCredits });
                  genPrediction();
                } else {
                  setTimeout(() => {
                    navigate("/purchase");
                  }, 0);
                }
              }}
            >
              Generate Test Prediction
            </button>
          </>
        ) : null}
      </form>
      <textarea value={response} readOnly></textarea>
      <button onClick={() => navigate("/purchase")}>Purchase Credits</button>
    </div>
  );
}
