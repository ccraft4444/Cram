const router = require("express").Router();
const { asyncErrorHandler } = require("./utils");
const prisma = require("../prisma/prisma");
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

OPEN_AI_KEY = process.env.OPENAI_API_KEY;

const model = new OpenAI({ temperature: 0.9 });
const template = "Return flashcard set... {studyGuide}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["studyGuide"],
});

const model1 = new OpenAI({ temperature: 0.9 });
const template1 = "Return test prediction... {studyGuide}?";
const prompt1 = new PromptTemplate({
  template: template1,
  inputVariables: ["studyGuide"],
});

const chain = new LLMChain({ llm: model, prompt: prompt });
const chain1 = new LLMChain({ llm: model1, prompt: prompt1 });

const generateResponse = async () => {
  const res = await chain.call({ studyGuide: text });
  console.log(res);
  return res;
};

const generateResponse1 = async () => {
  const res = await chain1.call({ studyGuide: text });
  console.log(res);
  return res;
};

router.get("/flashcard", async (req, res) => {
  const { studyGuide } = req.body;
  const response = generateResponse(studyGuide);
  res.send(response);
});

router.get("/prediction", async (req, res) => {
  const { studyGuide } = req.body;
  const response = generateResponse1(studyGuide);
  res.send(response);
});
