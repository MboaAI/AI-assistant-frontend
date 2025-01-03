export async function analyzeDiscoursBackend(message) {
    if (!message) {
        throw new Error("Message is required.");
    }

    try {
        // Send the request to the Flask API
        const response = await fetch("https://api.filparty.com/api/v0/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown error occurred");
        }

        const data = await response.json();
        return data.response || "No response from AI.";
    } catch (error) {
        console.error("Error in analyzeDiscoursBackend:", error);
        throw new Error("Unable to connect to the AI service.");
    }
}
