const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const router = express.Router();
const JWT_SECRET = "codescore360_secret";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ email });
  if (!employee) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });
  
  const token = jwt.sign({ id: employee._id, role: employee.role }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token, userId: employee._id, role: employee.role, name: employee.name });
  
});
router.post("/register-manager", async (req, res) => {
  const { name, email, password } = req.body;

  const existingManager = await Employee.findOne({ role: "manager" });
  if (existingManager)
    return res.status(403).json({ message: "Manager already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const manager = new Employee({
    name,
    email,
    password: hashedPassword,
    role: "manager"
  });

  await manager.save();
  res.json({ message: "Manager registered successfully" });
});

module.exports = router;