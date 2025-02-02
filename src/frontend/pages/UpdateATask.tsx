// File: UpdateATask.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Using SweetAlert2
import "./DisplayTasks.css"; // Shared styles
import "./UpdateATask.css";

interface Task {
  _id: string;
  taskName: string;
  taskCategory: string;
  taskPriority: string;
  dueDate?: Date;
}

const UpdateTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // For the modal
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  // Open modal by selecting a task
  const openModal = (task: Task) => {
    // Create a copy of the task so we can edit it in state
    setEditingTask({ ...task });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  // Handle input changes inside the modal form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editingTask) return;
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  // Save changes (with SweetAlert2 confirmation)
  const handleSaveEdit = () => {
    if (!editingTask) return;

    Swal.fire({
      title: "Confirm Update",
      text: `Are you sure you want to update "${editingTask.taskName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3000/tasks/${editingTask._id}`, editingTask)
          .then((_response) => {
            // Update local state to reflect changes
            setTasks((prevTasks) =>
              prevTasks.map((t) =>
                t._id === editingTask._id ? editingTask : t
              )
            );

            Swal.fire("Updated!", "Your task has been updated.", "success");
            closeModal();
          })
          .catch((error) => {
            console.error("Error saving task:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="taskListContainer">
      <h2>Update A Task</h2>

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <ul className="taskList">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`taskItem ${task.taskPriority.toLowerCase()}`}
              onClick={() => openModal(task)}>
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
                {/* Pencil icon to also open modal */}
                <img
                  id="pencil"
                  src="../src/frontend/assets/pencil.png"
                  alt="Edit"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent <li> onClick
                    openModal(task);
                  }}
                />
              </p>
            </li>
          ))}
        </ul>
      )}

      {showModal && editingTask && (
        <div className="modalOverlay" onClick={closeModal}>
          {/* Apply the same priority class to the modalContent */}
          <div
            className={`modalContent ${editingTask.taskPriority.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button className="closeButton" onClick={closeModal}>
              &times;
            </button>

            <h3>Edit Task</h3>

            {/* Form fields */}
            <div className="formGroup">
              <label>Task Name:</label>
              <br />
              <input
                id="taskInput"
                type="text"
                name="taskName"
                value={editingTask.taskName}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Category:</label>
              <br />
              <select
                name="taskCategory"
                value={editingTask.taskCategory}
                onChange={handleChange}>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Priority:</label>
              <br />
              <select
                id="taskPriorityDropdown"
                name="taskPriority"
                value={editingTask.taskPriority}
                onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Due Date:</label>
              <br />
              <input
                type="date"
                name="dueDate"
                value={
                  editingTask.dueDate
                    ? (() => {
                        const localDate = new Date(editingTask.dueDate);
                        localDate.setMinutes(
                          localDate.getMinutes() - localDate.getTimezoneOffset()
                        );
                        return localDate.toISOString().split("T")[0];
                      })()
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            {/* Buttons */}
            <div className="buttonsRow">
              <button className="saveButton" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="cancelButton" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTasks;
