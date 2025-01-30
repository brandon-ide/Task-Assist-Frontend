import React, { useState } from 'react';
import axios from 'axios';
import './AddATask.css';
import '../App.css';

const TaskDeleteForm: React.FC = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); 


  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!taskName) {
      setErrorMessage('Task does not exist!');
      return;
    }

    try {
      // Delete the given task'
      const response = await axios.delete(`http://localhost:3000/tasks/${taskName}`);      
    
      // Reset the form if the task is successfully added
      setTaskName('');
      setErrorMessage('');
      setSuccessMessage('Task deleted successfully!');

      // Reset recent success message after two seconds
      setTimeout(() => {
      setSuccessMessage('');
      }, 2000);

      // Log the response 
      console.log('Task Deleted:', response.data);
    } catch (error) {
      setErrorMessage('Failed to delete task! Please try again later.');
      console.error('Error deleting task:', error);
    }
  };

  return (
  
    <div className="addTaskContainer">
      <div>
        <h2>Delete a Task</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="addTaskForm">
            <label htmlFor="taskName">Task Name:</label>
            <input className="taskInput"
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            /><br></br>
           
          </div>
          
          <div className="buttonContainer">
            <button id="submitButton" type="submit">Delete Task</button>
          </div>
        </form>
      </div>
    </div>
    );
  };
  
export default TaskDeleteForm;