import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Summarize this article at a sophisticated level with as much detail as possible: https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus",
  temperature=0.7,
  max_tokens=4000,
  top_p=1.0,
  frequency_penalty=0.0,
  presence_penalty=0.0
)

print(response)
#Response is pretty short even when setting max tokens, perhaps playing with the prompt and system commands will yield higher token outputs. 