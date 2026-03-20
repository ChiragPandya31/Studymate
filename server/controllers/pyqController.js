import analyzePYQ from "../utils/analyzePYQ.js";

export const analyzePYQController = async (req, res) => {
  if (!req.files || !req.files.pdfs) {
    return res.status(400).json({ error: "No PDF files uploaded." });
  }

  const pdfFiles = Array.isArray(req.files.pdfs)
    ? req.files.pdfs
    : [req.files.pdfs];

  const buffers = await Promise.all(
    pdfFiles.map(async (file) => {
      return { buffer: file.data, filename: file.name };
    })
  );

  try {
    const result = await analyzePYQ(buffers);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Analyzer failed", details: err.message });
  }
};
