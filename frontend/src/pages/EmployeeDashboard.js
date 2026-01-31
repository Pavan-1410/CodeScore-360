import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Fetch tasks
        const taskRes = await API.get("/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setTasks(taskRes.data);

        // 🔹 Fetch feedback
        const feedbackRes = await API.get("/feedback", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setFeedback(feedbackRes.data);

      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <h2 className="text-xl font-bold">Welcome, {name}</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tasks */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="font-semibold mb-3">My Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks assigned.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Priority</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.priority}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">
                    {task.assignedDate
                      ? new Date(task.assignedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Feedback */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-3">Meeting Feedback</h3>

        {feedback.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedback.map(f => (
            <div key={f._id} className="bg-blue-50 p-3 rounded mb-2">
              <p><strong>Comment:</strong> {f.comments}</p>
              <p><strong>Rating:</strong> {f.rating}/5</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default EmployeeDashboard;