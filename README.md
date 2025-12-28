# Task Manager API 🚀

Hey there! This is a simple, lightweight Task Manager API I built using **Express.js**. I wanted to create something straightforward that handles all the basic task management needs like creating, updating, and filtering tasks.

## Project Overview
This project is a RESTful API that manages a list of tasks. Each task has a title, description, completion status, and priority level. It uses a local JSON file (`task.json`) as a quick and easy data store.

### Features:
- **CRUD Operations**: Full support for Create, Read, Update, and Delete.
- **Filtering**: Filter tasks by their completion status.
- **Priority Management**: Group tasks by priority levels (low, medium, high).
- **Auto-sorting**: Tasks are automatically sorted by their creation date.

## Setup Instructions

Getting this up and running on your machine is super easy:

1. **Clone the repo:**
   ```bash
   git clone <your-repo-url>
   cd task-manager-api-josegibson
   ```

2. **Install the goodies:**
   Make sure you have [Node.js](https://nodejs.org/) (v18+) installed.
   ```bash
   npm install
   ```

3. **Start the server:**
   You can run the server using the standard node command:
   ```bash
   node app.js
   ```
   *Note: If you're developing and want the server to restart automatically when you save changes, use nodemon (it's already in the dev dependencies!):*
   ```bash
   npx nodemon app.js
   ```
   The API will be live at `http://localhost:3000`.

## API Documentation

Here’s a breakdown of the endpoints and how you can test them using `curl`.

### 1. Fetch All Tasks
Get the full list of tasks.
- **Endpoint:** `GET /tasks`
- **Query Param:** `completed=true/false` (optional)
- **Test it:**
  ```bash
  curl http://localhost:3000/tasks
  ```

### 2. Get a Specific Task
Look up a task by its ID.
- **Endpoint:** `GET /tasks/:id`
- **Test it:**
  ```bash
  curl http://localhost:3000/tasks/1
  ```

### 3. Create a New Task
Add a fresh task to the list.
- **Endpoint:** `POST /tasks`
- **Body Requirement:**
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "completed": false,
    "priority": "medium"
  }
  ```
- **Test it:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"title":"New Task","description":"Details here","completed":false,"priority":"high"}' http://localhost:3000/tasks
  ```

### 4. Update an Existing Task
Change the details of a task.
- **Endpoint:** `PUT /tasks/:id`
- **Test it:**
  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Task","description":"Updated details","completed":true,"priority":"low"}' http://localhost:3000/tasks/1
  ```

### 5. Filter by Priority
Quickly see tasks based on priority.
- **Endpoint:** `GET /tasks/priority/:level`
- **Test it:**
  ```bash
  curl http://localhost:3000/tasks/priority/high
  ```

### 6. Delete a Task
Remove a task from the system.
- **Endpoint:** `DELETE /tasks/:id`
- **Test it:**
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Running Tests
I've written some automated tests using **tap** and **supertest** to make sure everything stays broken-free.

To run them, just hit:
```bash
npm test
```

---
Built with ☕ and code by Jose Gibson.
