import React, { useEffect, useState } from "react";
import axios from "axios";
import './DisplayTasks.css'
import './DeleteATask.css'

interface Task {
  _id: string;
  taskName: string;
  taskCategory: string;
  taskPriority: string;
  dueDate?: string;
}

const TaskDeleteForm: React.FC = () => {
  const [taskName, setTaskName] = useState<string>(""); // State for selected task name
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null); // Track hovered task
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null); // Track clicked task to delete

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

  // Handle task deletion
  const handleDeleteTask = async () => {
    if (!taskToDelete) {
      setErrorMessage(`Tap or Click Again to Confirm Delete`);
      return;
    }

    try {
      // Send the delete request to the server
      await axios.delete(`http://localhost:3000/tasks/${taskName}`);

      // Remove task from the state (UI)
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete._id));

      // Reset the task to delete state
      setTaskToDelete(null);
      setTaskName(""); // Reset taskName state
      setErrorMessage("");
      setSuccessMessage("Task deleted successfully!");

      // Reset recent success message after two seconds
      setTimeout(() => setSuccessMessage(""), 2000);

      console.log("Task Deleted:", taskToDelete.taskName);
    } catch (error) {
      setErrorMessage("Failed to delete task! Please try again later.");
      console.error("Error deleting task:", error);
    }
  };

  // Trigger delete on task click
  const handleTaskClick = (task: Task) => {
    setTaskName(task.taskName); // Update taskName state with clicked task's name
    setTaskToDelete(task); // Set the task to be deleted
    handleDeleteTask(); // Immediately attempt to delete the task
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
              className={`taskItem ${task.taskPriority.toLowerCase()} ${hoveredTaskId === task._id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredTaskId(task._id)} // On hover
              onMouseLeave={() => setHoveredTaskId(null)} // Reset on mouse leave
              onClick={() => handleTaskClick(task)} // Delete task when clicked
            >
              <h3>{task.taskName}</h3>
              <p>
                Category: <strong>{task.taskCategory}</strong> <strong> - </strong>
                Priority: <strong>{task.taskPriority}</strong> <strong> - </strong>
                Due: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Error or success message */}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}
    </div>
  );
};

export default TaskDeleteForm;

