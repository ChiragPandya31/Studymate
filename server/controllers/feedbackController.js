import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const feedback = await Feedback.create({ rating, comment });
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to submit feedback" });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(10);
    const ratings = await Feedback.find();
    const avgRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);
    res.json({ feedbacks, avgRating: avgRating.toFixed(1) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch feedbacks" });
  }
};
