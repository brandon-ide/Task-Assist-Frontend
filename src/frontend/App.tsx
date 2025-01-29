import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ViewPrivate from './pages/ViewPrivate';
import TaskForm from './pages/AddATask';
import DeleteATask from './pages/DeleteATask';
import UpdateATask from './pages/UpdateATask';
import UserProfile from './pages/UserProfile';
import ViewDeleted from './pages/ViewDeleted';

const App: React.FC = () => {
  
  return (
    <>
      <div className="logoAndGreetingAndProfileImageContainer">
        <img src="../src/frontend/assets/logo.png" className="logo" alt="TaskAssistLogo" />
          <p id="dashboardWelcomeMessage">Welcome to your dashboard user!</p>
        <img src="../src/frontend/assets/placeholder.jpg" className="userPicture" alt="profileImage" />
      </div>
      
      <div className="taskListDisplayContainer">
      
      </div>

      <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/viewdeletedtasks" element={<ViewDeleted />} />
            <Route path="/viewprivatetasks" element={<ViewPrivate />} />
            <Route path="/deletetask" element={<DeleteATask />} />
            <Route path="/updatetask" element={<UpdateATask />} />
            <Route path="/addtask" element={<TaskForm />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
};

export default App;
