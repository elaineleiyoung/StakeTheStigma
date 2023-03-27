import { useState } from "react";

export const OpenAI = async (url) => {

    const apiKey = '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';
    const prompt = "Summarize this at a sophisticated level with all crucial details with around 300 words:\n\n" + url;

    const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(apiKey)
      },
      body: JSON.stringify({
          "model": "text-davinci-003",
          'prompt': prompt,
          'temperature': 0.7,
          'max_tokens': 2000,
          'top_p': 1,
          'frequency_penalty': 0,
          'presence_penalty': 0.5,
      })
  };
  try {
      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();
      return {'text': data.choices[0].text};
  } catch (error) {
      console.log("Ran out of tokens for today! Try tomorrow!");
      return {'text': ""};
  }
}

