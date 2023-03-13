/*This file contains our api requests to GPT
in a separate file for organization purposes, but will combine into a single file with nhsApi later on*/
import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Summarization = () => {
  const [summary, setSummary] = useState("");
  const subscriptionKey = "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";

  useEffect(() => {
    const configuration = new Configuration({
      apiKey: subscriptionKey,
    });
    const openai = new OpenAIApi(configuration);

    async function getSummary() {
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: "Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.",
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      setSummary(response.choices[0].text);
    }
    getSummary();
  }, []);

  return (
    <div>
      <p>{summary}</p>
    </div>
  );
};

export default Summarization;
