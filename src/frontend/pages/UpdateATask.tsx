import React, { useState } from "react";
import axios from "axios";
import "./UpdateATask.css";

const UpdateATask: React.FC = () => {
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) {
      setMessage("Please enter a Task ID.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/tasks/${taskId}`, {
        taskName,
        taskCategory,
        taskPriority,
      });
      setMessage(`Task "${taskId}" updated successfully!`);
      // Clear form
      setTaskId("");
      setTaskName("");
      setTaskCategory("");
      setTaskPriority("Low");
    } catch (error) {
      setMessage("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="updateTaskContainer">
      <h2>Update Task</h2>
      {message && <p className="feedback">{message}</p>}
      <form onSubmit={handleUpdate}>
        <label>Task ID:</label>
        <input
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Enter Task ID"
        />

        <label>New Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label>New Task Category:</label>
        <input
          type="text"
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
        />

        <label>New Task Priority:</label>
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateATask;
