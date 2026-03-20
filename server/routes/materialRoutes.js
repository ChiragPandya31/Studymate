import express from "express";
import multer from "multer";
import path from "path";
import {
  createMaterial,
  getAllMaterials,
  updateViews,
  deleteMaterial,
} from "../controllers/materialController.js";

const router = express.Router();

// Configure multer for local PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // PDF folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDF files are allowed"));
  },
});

router.get("/", getAllMaterials);
router.post("/", upload.single("file"), createMaterial);
router.patch("/:id/view", updateViews);
router.delete("/:id", deleteMaterial);

export default router;
