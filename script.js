async function fetchAIResponse(prompt) {
    const response = await fetch("/.netlify/functions/ai-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// Load AI Farming Facts
async function loadFacts() {
    const factsContainer = document.getElementById("facts-container");
    factsContainer.innerHTML = await fetchAIResponse("Give me 3 short, useful farming tips for Dorper sheep and crops in Kenya.");
}

// Chatbot
async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const messagesDiv = document.getElementById("messages");
    const userMessage = userInput.value;
    if (!userMessage) return;

    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = "";

    const aiReply = await fetchAIResponse(userMessage);
    messagesDiv.innerHTML += `<p><strong>AI:</strong> ${aiReply}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Contact form auto response
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const aiResponse = await fetchAIResponse(`Reply politely to a farmer named ${name} who sent this message: ${message}`);
    document.getElementById("formResponse").innerText = aiResponse;
});

// Initialize
window.onload = loadFacts;
