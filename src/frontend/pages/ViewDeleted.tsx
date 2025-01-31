import React from "react";
import "./ViewDeleted.css";

const ViewDeleted: React.FC = () => {
  return (
    <div className="deletedTasksContainer">
      <h2>View Deleted Tasks</h2>
      <p>
        Here you can display your deleted tasks (if your backend tracks them).
      </p>
    </div>
  );
};

export default ViewDeleted;
