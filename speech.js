// Check browser support
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!window.SpeechRecognition) {
        alert("Your browser does not support Speech Recognition. Try Chrome.");
    } else {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US"; // Only support English.
        recognition.interimResults = true; // Show partial results
        recognition.continuous = true; // Keep listening until stopped

        const startBtn = document.getElementById("startBtn");
        const stopBtn = document.getElementById("stopBtn");
        const output = document.getElementById("output");

        let finalTranscript = "";

        recognition.onresult = (event) => {
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + " ";
                } else {
                    interimTranscript += transcript;
                }
            }
            output.textContent = finalTranscript + interimTranscript;
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        startBtn.onclick = () => {
            finalTranscript = "";
            recognition.start();
            startBtn.disabled = true;
            stopBtn.disabled = false;
        };

        stopBtn.onclick = () => {
            recognition.stop();
            startBtn.disabled = false;
            stopBtn.disabled = true;
        };
    }