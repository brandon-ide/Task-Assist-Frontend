// DeleteATask.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Using SweetAlert2
import "./DisplayTasks.css";
import "./DeleteATask.css";

interface Task {
  _id: string;
  taskName: string;
  taskCategory: string;
  taskPriority: string;
  dueDate?: string;
}

const TaskDeleteForm: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  // Confirm with SweetAlert2 before deletion
  const handleDelete = async (task: Task) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete "${task.taskName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/tasks/${task.taskName}`);
          setTasks((prev) => prev.filter((t) => t._id !== task._id));
          setSuccessMessage("Task deleted successfully!");
          // Clear success message after 2 seconds
          setTimeout(() => setSuccessMessage(""), 2000);
        } catch (error) {
          setErrorMessage("Failed to delete task! Please try again later.");
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  // On item click, trigger the delete confirmation
  const handleTaskClick = (task: Task) => {
    handleDelete(task);
  };

  return (
    <div className="taskListContainer">
      <h2>Delete A Task</h2>
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <ul className="taskList">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`taskItem ${task.taskPriority.toLowerCase()} ${
                hoveredTaskId === task._id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredTaskId(task._id)}
              onMouseLeave={() => setHoveredTaskId(null)}
              onClick={() => handleTaskClick(task)}>
              <h3>{task.taskName}</h3>
              <p>
                Category: <strong>{task.taskCategory}</strong>{" "}
                <strong> - </strong>
                Priority:{" "}
                <strong className="priority-label">
                  {task.taskPriority}
                </strong>{" "}
                <strong> - </strong>
                Due:{" "}
                {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}
    </div>
  );
};

export default TaskDeleteForm;
