/*This file contains our api requests to GPT
in a separate file for organization purposes, but will combine into a single file with nhsApi later on*/
import React, { useEffect, useState } from "react";

function OpenAIv2() {
    // const API_KEY;
    async function getSummary(url) {

        const systemMessage = {
            role: "system", 
            content: "Summarize articles as if I am 12 years old. "
        }
        const apiRequest = {
            "model": "gpt-3.5-turbo", 
            "messages": [
                systemMessage,
                url
            ]
        }
        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequest)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
        });
    }
    getSummary("https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus");
}

export default OpenAIv2;