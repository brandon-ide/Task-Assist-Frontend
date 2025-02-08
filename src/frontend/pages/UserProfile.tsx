// src/pages/UserProfile.tsx

import React, { useState } from "react";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./UserProfile.css";

interface ProfileProps {
  currentUser: any; // or: User | null
}

const UserProfile: React.FC<ProfileProps> = ({ currentUser }) => {
  const defaultEmail = currentUser?.email || "";
  const defaultPhoto =
    currentUser?.photoURL || "../src/frontend/assets/placeholder.jpg";
  const defaultName = currentUser?.displayName || "Your Name";

  // Basic profile info
  const [displayName, setDisplayName] = useState(defaultName);
  const [photoURL, setPhotoURL] = useState(defaultPhoto);
  const [email] = useState(defaultEmail);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Save user displayName/photo to Firebase Auth
  const handleSaveProfile = async () => {
    try {
      if (!currentUser) {
        setErrorMessage("No user is logged in.");
        return;
      }
      await updateProfile(currentUser, {
        displayName,
        photoURL,
      });
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (err: any) {
      setErrorMessage("Failed to update profile: " + err.message);
      setTimeout(() => setErrorMessage(""), 2500);
    }
  };

  // This only works for Email/Password accounts.
  // For Google accounts, password resets happen in Google’s UI.
  const handleResetPassword = async () => {
    if (!email) {
      setErrorMessage("No valid email to send password reset!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent!");
    } catch (err: any) {
      setErrorMessage("Reset failed: " + err.message);
    }
  };

  // If you want to hide "Reset Password" for Google sign-ins:
  const isPasswordUser = currentUser?.providerData?.some(
    (prov: any) => prov.providerId === "password"
  );

  return (
    <div className="userProfileContainer">
      <h2>User Profile</h2>
      <img src={photoURL} alt="User Avatar" className="userAvatar" />

      {/* Show any messages */}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}

      <div className="profileForm">
        <label htmlFor="displayName">Display Name:</label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <label htmlFor="photoURL">Photo URL:</label>
        <input
          id="photoURL"
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <button className="saveButton" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>

      {/* Conditionally show reset password if user is Email/Password */}
      {isPasswordUser && (
        <button
          style={{ marginTop: "20px" }}
          className="resetPassword"
          onClick={handleResetPassword}>
          Reset Password
        </button>
      )}
    </div>
  );
};

export default UserProfile;
