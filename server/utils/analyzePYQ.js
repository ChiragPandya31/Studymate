import { askGroq } from "./groq.js";

// Clean the text from PDF
function cleanText(text) {
  return text
    .replace(/\n\s*\n/g, "\n")
    .replace(/Page\s+\d+/gi, "")
    .replace(/(GTU|University|Examination|Seat No\.?|Enrollment No\.?).*/gi, "")
    .replace(/Total Marks.*|Instructions:.*/gi, "")
    .slice(0, 7000);
}

// Extract valid JSON from a markdown code block
function extractJSONfromCodeBlock(text) {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (!match) throw new Error("No valid JSON code block found.");
  return JSON.parse(match[1]);
}

export default async function analyzePYQ(buffers) {
  const pdf = (await import("pdf-parse")).default;
  const results = {};

  for (let { buffer, filename } of buffers) {
    const data = await pdf(buffer);
    const rawText = data.text;
    const text = cleanText(rawText);
    const subjectName = filename.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");

    const prompt = `
You are a smart assistant analyzing university exam papers.

📄 Here's the extracted text from one or more past year papers.

🎯 Your job:
- Identify and extract ONLY important and REPEATED questions.
- Group them by **year** (like 2022, 2023).
- Inside each year, group by **Unit 1**, **Unit 2**, etc.
- Also return a separate list of repeated questions overall.

📦 Return response ONLY in valid JSON, in a Markdown code block like this:
\`\`\`json
{
  "subject": "${subjectName}",
  "repeated_questions": ["Q1", "Q2", ...],
  "years": {
    "2022": {
      "Unit 1": [
        { "question": "Define OS.", "repeated": true },
        { "question": "Explain process scheduling.", "repeated": false }
      ]
    }
  }
}
\`\`\`

DO NOT include any explanation, notes or extra text.

Here is the PDF content:
"""
${text}
"""`;

    try {
      const response = await askGroq(prompt);
      const json = extractJSONfromCodeBlock(response);
      results[filename] = json;
    } catch (err) {
      results[filename] = {
        error: true,
        message: "AI failed to parse: " + err.message,
      };
    }
  }

  return results;
}
