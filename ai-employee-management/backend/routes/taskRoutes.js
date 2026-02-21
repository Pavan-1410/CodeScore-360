const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Assign Task
router.post("/", authMiddleware, roleMiddleware(["manager"]), async (req, res) => {
  try{
    const {title,priority,employeeId}= req.body;
    const task = new Task({title,priority,assignedTo:employeeId,assignedBy:req.user.userId,status:"Assigned",assignedDate:new Date()});
    
  console.log(req.user.role);

  await task.save();
   res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
 
});
router.get("/all", authMiddleware, roleMiddleware(["manager"]), async (req, res) => {
  
  
  const tasks = await Task.find().populate("assignedTo", "name").populate("assignedBy", "name");
  res.json(tasks);
});
// Get Tasks for an Employee
router.get("/",authMiddleware,roleMiddleware(["employee"]), async (req, res) => {
  try{
  const tasks = await Task.find({ assignedTo: req.user.id });
  res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;