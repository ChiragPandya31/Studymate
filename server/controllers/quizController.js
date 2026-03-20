import { mcqs } from "../data/mcqs.js";

export const generateQuiz = (req, res) => {
  const subject = req.query.subject?.toLowerCase();

  if (!subject || !mcqs[subject]) {
    return res.status(404).json({ error: "No questions found for this subject" });
  }

  // Shuffle and return top 5
  const shuffled = [...mcqs[subject]].sort(() => 0.5 - Math.random());
  res.json({ questions: shuffled.slice(0, 5) });
};
