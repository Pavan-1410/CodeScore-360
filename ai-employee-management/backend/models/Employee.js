const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
   designation:{
    type:String,
    required:true
  },
  role:{ type:String , enum: ['admin', 'manager', 'employee'],
    required:true
   },
 
  joinedDate: { type: Date, default: Date.now },
  password:String,
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);