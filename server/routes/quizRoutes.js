import express from "express";
import { askGroq } from "../utils/groq.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const subject = req.query.subject?.toLowerCase().trim();

  if (!subject) return res.status(400).json({ message: "Subject is required." });



  const prompt = `Generate 5 multiple choice questions (MCQs) with 4 options each and correct answer for the subject: "${subject}".   
You're StudyMate, an AI that creates **multiple-choice questions** for Engineering students. Format it in this strict JSON array format:
  Guildelines:
- Only generate if the subject is related to the Computer Engineering syllabus (like DBMS, OS, CN, DSA, OOP, etc).

If the topic is unrelated to academics or CE (e.g. cricket, fashion, politics), respond with:
"I can only generate MCQs for study related topics, Please try a valid subject."
;


[
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option B"
  }
]

Do NOT include explanation or markdown. Only return the raw JSON array.`;

  try {
    const raw = await askGroq(prompt);
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]") + 1;
    const jsonPart = cleaned.slice(start, end);

    const questions = JSON.parse(jsonPart);
    return res.json({ questions });
  } catch (err) {
    console.error("Quiz generation failed:", err.message);
    return res.status(500).json({ message: "Failed to generate quiz." });
  }
});

export default router;
