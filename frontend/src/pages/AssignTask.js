import React,{useState,useEffect} from "react";
import API from "../services/api";

function AssignTask() {
  const [employees,setemployees]=useState([]);
  const [task,settask]=useState({
   
    title:"",
    date:null,    
    priority:"High",
    employeeId:""
  })
  useEffect(()=>{
    //fetch employees
    const fetchemployees=async()=>{
      try{
        const response=await API.get("/employees",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        setemployees(response.data);
      }catch(error){
        console.error("Error fetching employees:",error);
      }
    };
    fetchemployees();
  },[]);

   
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!task.employeeId || !task.title || !task.date){  
      alert("Please fill all fields.");
      return;
    }
    try{
      await API.post("/tasks",task,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Task assigned successfully!");
      settask({
        
        title:"",
        date:"",
        priority:"High",
        employeeId:""
      })
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Error assigning task. Please try again.");

    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Assign Task
    </h2>

    {/* Employee Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Employee Name
      </label>
      <select
  value={task.employeeId}
  onChange={(e) => settask({ ...task, employeeId: e.target.value })}
>
  <option value="">Select Employee</option>
  {employees.map(emp => (
    <option key={emp._id} value={emp._id}>
      {emp.name}
    </option>
  ))}
</select>
    </div>

    {/* Task Title */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Task Title
      </label>
      <input
        type="text"
        placeholder="Enter task title"
        onChange={(e) =>
          settask({ ...task, title: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Due Date */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Due Date
      </label>
      <input
        type="date"
        onChange={(e) =>
          settask({ ...task, date: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Priority */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Priority
      </label>
      <select
        onChange={(e) =>
          settask({ ...task, priority: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-lg bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>

    {/* Submit Button */}
    <button
      onClick={handleSubmit}
      className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
    >
      Assign Task
    </button>

  </div>
</div>

  )
}

export default AssignTask;