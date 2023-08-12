const API_BASE_URL = "http://localhost:3006/routes";

const API_ENDPOINTS = {
  workouts: {
  },
  users: {
    signIn: "/users/signin",
    signUp: "/users/register",
    getUsers: "/users/getUsers",
  },
  week:{
    updateCounts: "/week/updateCounts",
    getWeekData: "/week/getWeekData",
    saveWeekData: "/week/saveWeekData",
    updateWorkouts: "/week/updateWorkouts",
  }
};

export { API_BASE_URL, API_ENDPOINTS };
