// Import the necessary module from groq-sdk
import { Groq } from "groq-sdk";

// Access the environment variable using import.meta.env
const GROQ_API = import.meta.env.VITE_GROQ;

// Create a new instance of Groq with the necessary configurations
const groq = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: GROQ_API,
});

// Define the function to make a request to Groq AI
export const requestToGroqAI = async (content) => {
  try {
    // Make the chat completion request
    const reply = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content,
        },
      ],
      model: "llama3-8b-8192",
    });

    // Return the content of the first choice
    return reply.choices[0].message.content;
  } catch (error) {
    console.error("Error making request to Groq AI:", error);
    throw new Error("Failed to get a response from Groq AI");
  }
};
