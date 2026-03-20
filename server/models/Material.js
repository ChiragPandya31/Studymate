import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  materialType: { type: String, required: true },
  contentURL: { type: String, required: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Material", materialSchema);
