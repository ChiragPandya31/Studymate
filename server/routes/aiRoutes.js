import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = express.Router();

// 🛡️ Warn if no API key found
if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY is missing from .env");
}

const groqAPI = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// ⚡ Utility: Ask AI with proper error handling
async function askGroq(prompt) {
  try {
    const { data } = await groqAPI.post("/chat/completions", {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });
    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err.message);
    throw new Error("Groq API request failed");
  }
}

// 🧠 Summarizer
router.post("/summarizer", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ result: "Text is required." });

  try {
    const prompt = `
You are StudyMate, an AI that only summarizes academic content for every Engineering students.

Rules:
- If the input is NOT related to subjects like DBMS, OS, CN, DSA, OOP, etc., respond exactly:
  "Sorry, I only summarize study-related concepts. Please enter a valid academic topic."
- If the input is relevant, generate a clean and structured summary.

Format (if valid):
Topic: <detected topic name>
Summary:
- Point 1
- Point 2
- Point 3
- (max 5-6 points only)

Now summarize this input:
"${text}"
`;

    const result = await askGroq(prompt);
    res.json({ result });
  } catch (err) {
    console.error("Summarizer error:", err.message);
    res.status(500).json({ result: "Summarizer failed." });
  }
});

// 📖 Explain
router.post("/explain", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ result: "Text is required." });

  try {
    const prompt = `
You are StudyMate AI — an expert tutor for every Engineering concepts.

Task: Answer the question below in **ChatGPT-style**, as if you're helping a student in a college exam.

Guidelines:
- Explain the topic in a clear, conversational, academic tone.
- Keep it structured, long-form (like a 7-10 mark theory answer).
- Include: definition, explanation, and point-wise breakdown or examples (if useful).
- Format the response naturally like ChatGPT would — no headings like "Topic:", just natural flow.

If the question is unrelated to Engineering (e.g. cooking, politics, etc.), respond:
"Sorry, I can only explain study-related topics. Please enter a valid academic concept."

Question: "${text}"

Now give a full, helpful explanation.
`;

    const result = await askGroq(prompt);
    res.json({ result });
  } catch (err) {
    console.error("Explain error:", err.message);
    res.status(500).json({ result: "Explain failed." });
  }
});

// 📝 MCQ Generator
router.post("/mcq", async (req, res) => {
  const { subject } = req.body;
  if (!subject) return res.status(400).json({ result: "Subject is required." });

  try {
    const prompt = `
You're StudyMate, an AI that creates **multiple-choice questions** for Engineering students.
Guildelines:
- Only generate if the subject is related to the Computer Engineering syllabus (like DBMS, OS, CN, DSA, OOP, etc).

If the topic is unrelated to academics or CE (e.g. cricket, fashion, politics), respond with:
"I can only generate MCQs for study related topics, Please try a valid subject."

Task:
Generate 10 unique MCQs for the subject "${subject}" in this strict JSON format:
[
  {
    "question": "What is ...?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option B"
  }
]
`;

    const raw = await askGroq(prompt);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]") + 1;
    const jsonPart = cleaned.slice(start, end);

    let mcqs;
    try {
      mcqs = JSON.parse(jsonPart);
    } catch (jsonErr) {
      return res.status(500).json({ result: "Failed to parse MCQs." });
    }

    res.json({ result: mcqs });
  } catch (err) {
    console.error("MCQ error:", err.message);
    res.status(500).json({ result: "MCQ generation failed." });
  }
});

export default router;
