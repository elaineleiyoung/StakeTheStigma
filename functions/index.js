const functions = require("firebase-functions");
const spawn = require('child_process').spawn;

exports.runPythonScript = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    const pythonProcess = spawn('python', ['openAI.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(data);
     });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send(`Error: ${data}`);
    });

    pythonProcess.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            res.status(500).send('Error running Python script');
        }
    });
});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
