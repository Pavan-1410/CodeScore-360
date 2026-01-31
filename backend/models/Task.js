const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  employeeName: String,
  title: String,
  priority: String,
  assignedTo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  status: { type: String, default: "Assigned" },
  assignedDate: Date
});

module.exports = mongoose.model("Task", TaskSchema);