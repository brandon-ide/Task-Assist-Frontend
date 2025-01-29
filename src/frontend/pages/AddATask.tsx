import React, { useState } from 'react';
import axios from 'axios';
import './AddATask.css';
import '../App.css';

// Define the Task interface
interface Task {
  _id: string;  // ObjectId as a string for simplicity in the frontend
  taskName: string;
  dateOfEntry: Date;
  taskCategory: string;
  taskPriority: string;
  dueDate?: Date;
}

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [taskCategory, setTaskCategory] = useState<string>('');
  const [taskPriority, setTaskPriority] = useState<string>('Low');  // Default is 'Low'
  const [dueDate, setDueDate] = useState<string>('');  // Empty string for optional due date
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!taskName || !taskCategory || !taskPriority) {
      setErrorMessage('All fields except Due Date are required!');
      return;
    }

    const newTask: Omit<Task, '_id'> = {
      taskName,
      dateOfEntry: new Date(),  // Set the dateOfEntry to the current date
      taskCategory,
      taskPriority,
      dueDate: dueDate ? new Date(dueDate) : undefined, // Optional dueDate field
    };

    try {
      // POST the new task to the API
      const response = await axios.post('http://localhost:3000/tasks', newTask);
      
      // Reset the form if the task is successfully added
      setTaskName('');
      setTaskCategory('');
      setTaskPriority('Low');
      setDueDate('');
      setErrorMessage('');
      
      // Log the response to see the new task
      console.log('New task added:', response.data);
    } catch (error) {
      setErrorMessage('Failed to add task! Please try again later.');
      console.error('Error adding task:', error);
    }
  };

  return (
  
  <div className="addTaskContainer">
    <div>
      <h2>Add New Task</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
          <label htmlFor="taskCategory">Task Category:</label>
          <select
            id="taskCategory"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            required
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Private">Private</option>
          </select><br></br>
          <label htmlFor="taskPriority">Task Priority:</label>
          <select
            id="taskPriority"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select><br></br>
          <label htmlFor="dueDate">Due Date (optional):</label>
          <input className="dueDateInput"
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="buttonContainer">
          <button id="submitButton" type="submit">Add Task</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default TaskForm;
