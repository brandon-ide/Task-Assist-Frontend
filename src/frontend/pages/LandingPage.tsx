// src/pages/LandingPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
// If you still want to keep Email/Password for fallback,
// just remove from final code if not needed
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { auth, googleProvider } from "../firebaseConfig";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Single function to handle "Sign in with Google"
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage("Signed in with Google!");
      navigate("/tasks");
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      setErrorMessage(error.message || "Google Sign-In failed.");
    }
  };

  return (
    <div className="landingPageContainer">
      <div className="welcomeBanner">
        <h1>Welcome to TaskAssist</h1>
        <p>Organize your tasks easily. Stay productive!</p>
      </div>

      <div className="formContainer">
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        {successMessage && <p className="successMessage">{successMessage}</p>}

        {/* Single button for Google Auth */}
        <button className="googleButton" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
