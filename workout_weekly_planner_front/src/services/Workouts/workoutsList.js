import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";

export const workoutsList = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.workouts.getWorkouts}`
    );

    if (!response.ok) {
      throw new Error("Error retrieving workoutItems" + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving workoutItems:", error);
    throw error;
  }
};
