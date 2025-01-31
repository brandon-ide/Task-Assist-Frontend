import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayTasks.css";

interface Task {
  _id: string;
  taskName: string;
  taskCategory: string;
  taskPriority: string;
  dueDate?: string;
}

const DisplayTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="taskListContainer">
      <h2>Your Tasks</h2>
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <ul className="taskList">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`taskItem ${task.taskPriority.toLowerCase()}`}>
              <h3>{task.taskName}</h3>
              <p>Category: {task.taskCategory}</p>
              <p>
                Priority: <strong>{task.taskPriority}</strong>
              </p>
              {task.dueDate && (
                <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayTasks;
