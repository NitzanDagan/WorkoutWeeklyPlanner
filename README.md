# WorkoutWeeklyPlanner

## Description

WorkoutWeeklyPlanner is an application designed to help users stay organized with their workouts. Whether you're a fitness enthusiast or just starting your fitness journey, this app provides a user-friendly platform to plan and track your weekly workouts effectively.

## Installation

### Backend

**Clone the Repository:**

`git clone https://github.com/NitzanDagan/WorkoutWeeklyPlanner.git`

**Setting up the Backend:**

- Navigate to the backend directory: `cd workout_weekly_planner_back/`
- Install backend dependencies: `npm install`
- Create a .env file in the project root directory with the following content:

```
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

- Replace <your-mongodb-connection-string> with your MongoDB connection string and <your-jwt-secret> with a secret key for JSON Web Tokens.
- Start the server: `node server`

### Frontend
**Setting up the Frontend:**
- Navigate to the frontend directory: `cd workout_weekly_planner_front/`
- Install frontend dependencies: `npm install`
- Start the application: `npm start`









