# Task Assist

![Task Assist Logo](./Task-assist-logo.png)

## 🌟 Project Overview

**Task Assist** is a comprehensive task management system designed to help users efficiently organize and track their tasks. Built using modern web development technologies, Task Assist provides a user-friendly interface and robust backend functionality to ensure a seamless experience.

## ✨ Features

### 📝 Task Management

- Create, update, and delete tasks.
- Mark tasks as completed or pending.
- Categorize tasks (e.g., work, personal, urgent).

### 🔍 Task Filtering and Sorting

- Filter tasks by category, status, or due date.
- Sort tasks by priority or creation date.

### 🔒 User Authentication

- Secure sign-up and login functionality.
- Authentication using JWT or Firebase.

### 📊 Dashboard

- Display all tasks in an organized table or card layout.
- Show statistics, such as the number of completed and pending tasks.

### 👤 User Profiles

- Update user profile details.
- Display personalized greetings.

## 🛠️ Technology Stack

### Frontend

- HTML, CSS, React.js
- Responsive design: Mobile-first approach

### Backend

- Node.js, Express.js
- API Endpoints:
  - `GET`: Retrieve tasks
  - `POST`: Add a new task
  - `PUT`: Update a task
  - `DELETE`: Remove a task

### Database

- MongoDB (cloud-hosted cluster)
- Functions:
  - Store tasks
  - Manage user data
  - Ensure data integrity (add, update, delete validations)

### Authentication

- Firebase for user authentication (optional integration)
- JWT for secure sessions

### Testing

- Unit testing for API endpoints
- UI testing for React components

## 📂 Project Structure

### Frontend

- **HTML**: Build the top section for title and information.
- **CSS**: Create styling for consistent design.
- **React**:
  - Build reusable components
  - Set up routing

### Backend

- **APIs**:
  - Implement CRUD operations for tasks.
  - Include authentication endpoints.
- **Task Operations**:
  - Create, delete, update, and view tasks.
  - Undo delete functionality.

### Database

- **MongoDB**:
  - Online cluster with necessary collections.
  - Test database functionality to verify task actions.

## 🚀 Development Workflow

### Priorities

1. **Functionality**: Implement core features (create, update, delete tasks).
2. **HTML & CSS**: Build the frontend structure and style.
3. **APIs**: Develop backend endpoints for seamless integration.
4. **Authentication**: Secure the application using Firebase or JWT.
5. **Dashboard**: Visualize tasks and statistics.
6. **User Profiles**: Personalize user experiences.

### UI/UX Design

- **Mobile-first**: Optimize for smaller screens first.
- **Tablet and Desktop**: Ensure seamless scalability.
- **React Components**: Reusable and modular components.

## 💻 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/brandon-ide/TaskAssist.git
   ```
2. Install dependencies:
   ```bash
   cd TaskAssist
   npm install
   ```
3. Set up the database:
   - Create a MongoDB cluster.
   - Add necessary collections for tasks and users.
4. Run the application:
   ```bash
   npm start
   ```
5. Access the application at `http://localhost:3000`.

## 🧪 Testing

- Run unit tests for APIs:
  ```bash
  npm test
  ```
- Test UI components with React Testing Library.

## 🔗 Coding Snippet Example

Here's an example of how to create a task using the API:

```javascript
const createTask = async (task) => {
  try {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    console.log("Task created:", data);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

createTask({ title: "New Task", category: "Work", completed: false });
```

## 🤝 Contributions

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request (PR) with a detailed description.

**Ballers Team**
