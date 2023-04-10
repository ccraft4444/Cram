import os
# import openai
import PyPDF2

os.environ["OPENAI_API_KEY"] = ""

from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate