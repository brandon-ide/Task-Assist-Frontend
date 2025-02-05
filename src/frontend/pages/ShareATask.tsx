import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./DisplayTasks.css";
import "./ShareATask.css";

interface Task {
  _id: string;
  taskName: string;
  taskCategory: string;
  taskPriority: string;
  dueDate?: string;
  sharedWith?: string; // New field to store who the task is shared with
}

const TaskShareForm: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sharedWith, setSharedWith] = useState<string>(""); // State for sharing person's name
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State to control modal visibility
  const [shareLink, setShareLink] = useState<string>(""); // Store the generated secure link

  // Ref for modal
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Close modal if clicked outside
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setModalVisible(false); // Close the modal
    }
  };

  useEffect(() => {
    // Adding the event listener for clicks outside the modal
    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  // Handle sharing the task with another user
  const handleShareTask = async () => {
    if (!selectedTask || !sharedWith) return; // Prevent sharing if no task or name is provided

    try {
      const updatedTask = {
        ...selectedTask,
        sharedWith: sharedWith, // Assign the shared person's name to the task
      };

      // Send the updated task to the server
      await axios.put(`http://localhost:3000/tasks/${selectedTask.taskName}`, updatedTask);

      // Generate the secure link to share
      const link = `http://localhost:3000/shared-task/${selectedTask.taskName}/${sharedWith}`;

      // Set the generated link
      setShareLink(link);

      // Update task in state
      setTasks((prev) =>
        prev.map((task) =>
          task._id === selectedTask._id ? { ...task, sharedWith: sharedWith } : task
        )
      );

      setSuccessMessage("Task shared successfully!");
      setModalVisible(false); // Hide modal after sharing
      setSharedWith(""); // Clear the input field

      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      setErrorMessage("Failed to share task! Please try again later.");
      console.error("Error sharing task:", error);
    }
  };

  // Handle task click to open the modal
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true); // Show the modal when a task is clicked
  };

  // Function to copy the share link to clipboard
  const copyLinkToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(() => {
        setSuccessMessage("Link copied to clipboard!");
        setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
      }).catch((err) => {
        console.error("Failed to copy link: ", err);
        setErrorMessage("Failed to copy link. Please try again.");
      });
    }
  };

  return (
    <div className="taskListContainer">
      <h2>Share A Task</h2>
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <ul className="taskList">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`shareTaskItem ${task.taskPriority.toLowerCase()} ${
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
              {task.sharedWith && (
                <p className="sharedWith">Shared with: {task.sharedWith}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}

      {/* Modal for sharing the task */}
      {modalVisible && selectedTask && (
        <div className="modal" ref={modalRef}>
          <div className="shareModalContent">
            <button
              className="closeModalBtn"
              onClick={() => setModalVisible(false)}>
              &times;
            </button>
            <h3>Share Task: "{selectedTask.taskName}"</h3>
            <label htmlFor="sharedWith"><strong>Who are you sharing with?</strong></label><br></br>
            <input
              type="text"
              id="sharedWith"
              value={sharedWith}
              onChange={(e) => setSharedWith(e.target.value)}
              placeholder="Recipient Name Required"
            />
            <div className="modalActions">
              <button className="saveButton" onClick={handleShareTask}>
                Share Task
              </button>
              <button className="cancelButton" onClick={() => setModalVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display the secure share link after the task is shared */}
      {shareLink && (
        <div className="shareLinkContainer">
          <p>Share this link:</p>
          <input
            type="text"
            readOnly
            value={shareLink}
            className="shareLinkInput"
          />
          <button className="copyLinkBtn" onClick={copyLinkToClipboard}>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskShareForm;


