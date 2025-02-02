import React, { useState } from "react";
import axios from "axios";
import "./AddATask.css";

const AddATask: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!taskName || !taskCategory || !taskPriority) {
      setErrorMessage("All fields except Due Date are required!");
      return;
    }

    try {
      // Build the new task object
      const newTask = {
        taskName,
        dateOfEntry: new Date(),
        taskCategory,
        taskPriority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      };

      // POST the new task to your API
      await axios.post("http://localhost:3000/tasks", newTask);

      // Reset form on success
      setTaskName("");
      setTaskCategory("");
      setTaskPriority("Low");
      setDueDate("");
      setErrorMessage("");
      setSuccessMessage("Task added successfully!");

      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      setErrorMessage("Failed to add task! Please try again later.");
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="addTaskContainer">
      <h2>Add New Task</h2>

      {/* Display error or success messages */}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="addTaskForm">
          <label htmlFor="taskName">Task Name:</label>
          <input
            className="taskInput"
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          <label htmlFor="taskCategory">Task Category:</label>
          <select
            id="taskCategory"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            required>
            <option value="">--Select--</option>
            <option value="pork">Work</option>
            <option value="personal">Personal</option>
            <option value="private">Private</option>
          </select>

          <label htmlFor="taskPriority">Task Priority:</label>
          <select
            id="taskPriority"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="dueDate">Due Date (optional):</label>
          <input
            className="dueDateInput"
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="buttonContainer">
          <button id="submitButton" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddATask;
