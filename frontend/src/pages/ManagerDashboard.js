import React from "react";
import { Link } from "react-router-dom";

function ManagerDashboard() {
  const logout = () => {
     localStorage.removeItem("token");
      window.location.href = "/";
  };
 return (
   
  <div className="min-h-screen bg-gray-100 p-6">
    {/* Logout Button */}
    <div className="flex justify-end mb-4">
      <button

       onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
    
    {/* Header */}
    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Manager Dashboard
    </h2>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      
      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Total Employees</p>
        <h3 className="text-3xl font-bold text-indigo-600 mt-2">12</h3>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Tasks Assigned</p>
        <h3 className="text-3xl font-bold text-green-600 mt-2">38</h3>
      </div>

      <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
        <p className="text-sm text-gray-500">Pending Reviews</p>
        <h3 className="text-3xl font-bold text-red-500 mt-2">6</h3>
      </div>

    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Quick Actions
      </h3>

      <div className="flex flex-wrap gap-4">
        <Link to="/add-employee">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
            Add Employee
          </button>
        </Link>

        <Link to="/assign-task">
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
            Assign Task
          </button>
        </Link>

        <Link to="/meeting-feedback">
          <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
            Meeting Feedback
          </button>
        </Link>
        <Link to="/view-employees">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
            View Employees
          </button>
        </Link>
      </div>
    </div>

    {/* AI Insight */}
    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg shadow">
      <p className="text-indigo-700 font-medium">
        🧠 AI Insight
      </p>
      <p className="text-gray-700 mt-2">
        Pavan’s code quality improved by <span className="font-semibold">18%</span> this week.
      </p>
    </div>

  </div>
);

}

export default ManagerDashboard;