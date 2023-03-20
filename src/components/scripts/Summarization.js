import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../firebase';

function Summarization() {
    const [result, setResult] = useState('');
    
    const handleClick = async () => {
        const functions = getFunctions(app, 'us-central1');
        const runPythonScript = httpsCallable(functions, 'runPythonScript');
        const response = await runPythonScript();
        setResult(response.data);
    };

    return (
        <div>
            <button onClick={handleClick}>Run Python Script</button>
            <p>{result}</p>
        </div>
    );
};

export default Summarization;





