import os
import openai
from dotenv import load_dotenv

# openai.api_key = os.getenv("OPENAI_API_KEY")

def OpenAISummarization():
  response = openai.Completion.create(
    model="text-davinci-003",
    prompt="Summarize this article at a sophisticated level with as much detail as possible and at least 200 words: https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus",
    temperature=0.7,
    max_tokens=2000,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0
  )

  return(response.choices)
#Response is pretty short even when setting max tokens, perhaps playing with the prompt and system commands will yield higher token outputs. 