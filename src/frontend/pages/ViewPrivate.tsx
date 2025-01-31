import React from "react";
import "./ViewPrivate.css";

const ViewPrivate: React.FC = () => {
  return (
    <div className="privateTasksContainer">
      <h2>View Private Tasks</h2>
      <p>
        Here you can display your private tasks (if your backend supports them).
      </p>
    </div>
  );
};

export default ViewPrivate;
