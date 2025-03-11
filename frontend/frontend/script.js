async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let responseDiv = document.getElementById("response");

    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: "test_user", message: userInput })
    });

    const data = await response.json();
    responseDiv.innerHTML = `<p><strong>You:</strong> ${data.user_input}</p>
                             <p><strong>AI:</strong> ${data.ai_response}</p>
                             <p><em>Sentiment Score: ${data.sentiment_score.toFixed(2)}</em></p>`;
}
