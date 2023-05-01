import { useState } from "react";

export const Categorize = async (query) => {

    const apiKey = process.env.REACT_APP_OPEN_AI_KEY;
    const prompt = "Out of these women's health categories [Reproductive health, Breast health, Sexual health, Mental health, Cardiovascular health, Bone health, Cancer, Autoimmune diseases, Skin health, Muscular Health, Nutrition and fitness], which one does the user's query fall under best? If it falls under a category just return the name of the category, if it doesn't fall under any category return 'extra' :\n\n" + query;
    //Summarize this at a sophisticated level with all crucial details with around 300 words
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
          'max_tokens': 100,
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
      console.log("Ran out of tokens for today! Try tomorrow!" , error);
      return {'text': ""};
  }
}


