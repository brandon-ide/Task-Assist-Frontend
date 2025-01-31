import React from "react";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  return (
    <div className="userProfileContainer">
      <h2>User Profile</h2>
      <img
        src="../src/frontend/assets/placeholder.jpg"
        alt="User Avatar"
        className="userAvatar"
      />
      <p>Welcome, user! Customize your profile here.</p>
    </div>
  );
};

export default UserProfile;
