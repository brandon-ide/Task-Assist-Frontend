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

const ViewPrivateTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        const privateTasks = response.data.filter((task: Task) => task.taskCategory === "Private");
        setTasks(privateTasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  const openModal = (task: Task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <section className="taskListContainer" aria-labelledby="private-tasks-heading">
      <h2 id="private-tasks-heading">Private Tasks</h2>

      {loading ? (
        <p className="loading">Loading private tasks...</p>
      ) : (
        <ul className="taskList">
          {tasks.map((task) => {
            const priorityClass = task.taskPriority?.toLowerCase() || "";
            return (
              <li key={task._id} className={`taskItem ${priorityClass}`}
                onClick={() => openModal(task)}>
                <h3>{task.taskName}</h3>
                <p>
                  Category: <strong>{task.taskCategory}</strong>{" "}
                  <strong> - </strong>
                  Priority:{" "}
                  <strong className="priority-label">{task.taskPriority}</strong>{" "}
                  <strong> - </strong>
                  Due: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {selectedTask && (
        <div className="modalOverlay" onClick={closeModal}>
          {/* Apply the same priority class to the modalContent */}
          <div
            className={`modalContent ${selectedTask.taskPriority.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()}>
            <button className="closeButton" onClick={closeModal}>
              &times;
            </button>
            <h3>{selectedTask.taskName}</h3>
            <p>
              <strong>Category:</strong> {selectedTask.taskCategory}
            </p>
            <p>
              <strong>Priority:</strong>{" "}
              <span className="priority-label">
                {selectedTask.taskPriority}
              </span>
            </p>
            {selectedTask.dueDate && (
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(selectedTask.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewPrivateTasks;

