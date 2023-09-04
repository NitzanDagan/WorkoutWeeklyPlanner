import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";

export const updateWorkouts = async ({ weekNumber, userEmail, days }) => {
  if (weekNumber > 0 && userEmail && days.length > 0) {
    try {
      const formattedDays = days.map(({ dayOfWeek, workout }) => ({
        dayOfWeek,
        workout: workout
          ? {
              label: workout.label,
              // time: workout.time,
              status: workout.status,
              duration: workout.duration,
            }
          : null,
      }));

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.week.updateWorkouts}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weekNumber,
            userEmail,
            days: formattedDays,
          }),
        }
      );

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }
};
