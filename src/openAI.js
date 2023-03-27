import { useState } from "react";

export const OpenAI = (url) => {

    const [summary, setSummary] = useState("");
    console.log(url)

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
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
    fetch('https://api.openai.com/v1/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
            setSummary(data.choices[0].text);
        }).catch(err => {
            console.log("Ran out of tokens for today! Try tomorrow!");
        });
    return {
        'text': summary,
    };
}

