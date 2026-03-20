import mongoose from "mongoose";

const aiToolSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("AiTool", aiToolSchema);
