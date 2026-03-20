import express from "express";
import fileUpload from "express-fileupload";
import { analyzePYQController } from "../controllers/pyqController.js";

const router = express.Router();

// Middleware for file uploads
router.use(fileUpload({ useTempFiles: false }));

// POST /api/pyq/analyze-pyq
router.post("/analyze-pyq", analyzePYQController);

export default router;
