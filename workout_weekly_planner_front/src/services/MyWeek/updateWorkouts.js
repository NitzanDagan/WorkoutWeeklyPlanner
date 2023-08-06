export const updateWorkouts = async ({ weekNumber, userEmail, days }) => {
  if (weekNumber > 0 && userEmail && days.length > 0) {
    try {
      const formattedDays = days.map(({ dayOfWeek, workout }) => ({
        dayOfWeek,
        workout: workout ? { ...workout } : null,
      }));

      const response = await fetch(
        "http://localhost:3006/routes/week/updateWorkouts",
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
