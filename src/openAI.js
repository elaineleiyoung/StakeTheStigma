function OpenAI() {

    function query() {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const prompt = "Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus."

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
            console.log(data)
        }).catch(err => {
          console.log("Ran out of tokens for today! Try tomorrow!");
        });
    }

    return(
        <div>
            <button onClick = {query}>Generate Summary</button>
        </div>
    );
}

export default OpenAI;