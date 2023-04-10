import os
# import openai
import PyPDF2

os.environ["OPENAI_API_KEY"] = ""

from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.agents import load_tools
from langchain.agents import initialize_agent




# temperature controls variability in responses, 0 means same response for same prompt every time

llm = OpenAI(temperature=0.6)
llm2 = OpenAI(temperature=0.5)

def get_response_presentaion(prompt):
    response = llm2(prompt)
    return response

# simple prompt for study guide
def get_response(prompt):
    response = llm(prompt)
    return response

prompt = PromptTemplate(
    input_variables = ["study_guide"],
    template = "return a list of terms and definitions based on the given terms. RESPONSE MUST BE IN THIS FORMAT: Separate terms and definitions with a comma, tab, or dash. Separate rows with a semicolon or a new line. Fill in any definitions that are not given.  {study_guide}",
)

prompt2 = PromptTemplate(
    input_variables=["presentation"],
    template= "pull terms and concepts from this powerpoint and return a list of terms and definitions based on the given terms. DEFENITIONS MUST BE IN THIS FORMAT: Term - Definition; Fill in any definitions that are not given. and exclude irrelevant terms. {presentation}",
)

# potentially write another function that parses through the returned definitions and removes irrelevant terms


# for study guides
def pdf_reader():
    # take in pdf
    file = open("exam_review.pdf","rb")
    # read pdf
    study_guide_data = ""

    reader = PyPDF2.PdfReader(file)
    # store pdf data as study_guide_data
    page_amount = len(reader.pages)
    for i in range(page_amount-1):
        page = reader.pages[i]
        page_data = page.extract_text()
        study_guide_data += page_data
        print(study_guide_data)
    # pass pdf into prompt template as study_guide
    # need to ofc set this function behind paywall
    # get_response(prompt.format(study_guide=study_guide_data))


# for notes/presentations
def pdf_reader2():
    # take in pdf
    file = open("exam_review.pdf","rb")
    # read pdf
    presentation_data = ""

    reader = PyPDF2.PdfReader(file)
    # store pdf data as study_guide_data
    page_amount = len(reader.pages)
    for i in range(page_amount-1):
        page = reader.pages[i]
        page_data = page.extract_text()
        presentation_data += page_data
    # pass pdf into prompt template as study_guide
    # need to ofc set this function behind paywall
    # get_response_presentaion(prompt2.format(presentation=presentation_data))

    
    






