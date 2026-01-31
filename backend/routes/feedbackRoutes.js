const express = require("express");
const Feedback = require("../models/Feedback");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Add Feedback
router.post("/", async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.json(feedback);
});
router.get("/", authMiddleware,roleMiddleware(["employee"]),async (req, res) => {
  const feedbacks = await Feedback.find({ employeeId: req.params.employeeId });
  res.json(feedbacks);
});

module.exports = router;