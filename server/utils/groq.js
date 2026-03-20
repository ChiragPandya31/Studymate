import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export const askGroq = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return message;
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err.message);
    throw new Error("Groq API failed.");
  }
};
