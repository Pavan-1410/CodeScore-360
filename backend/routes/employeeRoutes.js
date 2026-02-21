const express = require("express");
const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Add Employee
router.post("/",authMiddleware,roleMiddleware(["manager"]), async (req, res) => {

  try{
  const {name,email,designation}=req.body;
  const hashedPassword = await bcrypt.hash("welcome123", 10);
  const employee = new Employee({name,email,designation,role:"employee",password:hashedPassword});
  await employee.save();
  res.json(employee);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Error adding employee" });
  }
});

// Get Employees
router.get("/", async (req, res) => {
  const employees = await Employee.find({role:"employee"});
  res.json(employees);
});

module.exports = router;