import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayTasks.css";
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
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // Track which task is being edited
  const [editedTask, setEditedTask] = useState<Task | null>(null); // Track the edited task's data

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

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task._id);
    setEditedTask({ ...task }); // Copy task data to the state for editing
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTask(null); // Reset editing state
  };

  const handleSaveEdit = () => {
    if (editedTask) {
      // Optionally, save the updated task to the backend here
      axios
        .put(`http://localhost:3000/tasks/${editedTask._id}`, editedTask)
        .then((_response) => {
          // Update the task list after saving the edited task
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === editedTask._id ? { ...editedTask } : task
            )
          );
          setEditingTaskId(null);
          setEditedTask(null); // Exit editing mode
        })
        .catch((error) => {
          console.error("Error saving task:", error);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedTask) {
      const { name, value } = e.target;
      setEditedTask({ ...editedTask, [name]: value });
    }
  };

  return (
    <div className="taskListContainer">
      <h2>Update A Task</h2>
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <ul className="taskList">


          
          {tasks.map((task) => (
            <li key={task._id} className={`taskItem ${task.taskPriority.toLowerCase()}`}>
              {editingTaskId === task._id ? (
                // Editing mode for this task
                <div>
                  <div>
                    <label><strong>Task Name:</strong></label>
                    <input id="taskInput"
                      type="text"
                      name="taskName"
                      value={editedTask.taskName} // disregard red line
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label><strong>Category:</strong></label>
                    <select 
                      name="taskCategory"
                      value={editedTask.taskCategory} // disregard red line
                      onChange={handleChange}
                    >
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Private">Private</option>
                    </select>
                  
                    <label><strong>Priority:</strong></label>
                    <select id="taskPriorityDropdown"
                      name="taskPriority"
                      value={editedTask.taskPriority} // disregard red line
                      onChange={handleChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <label><strong>Due Date:</strong></label>
                    <input
                      type="date"
                      name="dueDate"
                      value={editedTask.dueDate || ""}  // disregard red line
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button className="saveButton" onClick={handleSaveEdit}>Save</button>
                    <button className="cancelButton" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                // Display task info when not editing
                <div>
                  <h3>{task.taskName}</h3>
                  <p>
                    Category: <strong>{task.taskCategory}</strong> <strong> - </strong>
                    Priority: <strong>{task.taskPriority}</strong> <strong> - </strong>
                    Due: {task.dueDate && new Date(task.dueDate).toLocaleDateString()}

                    <a id="editButton" onClick={() => handleEditClick(task)}>
                      <img id="pencil" src="../src/frontend/assets/pencil.png" alt="Pencil Edit Button" />
                    </a>
                  </p>
                  
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpdateTasks;

