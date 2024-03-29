import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";

export const checkAndSaveWeekData = async (userEmail, userName, weekNumber) => {
  try {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.week.getWeekData}?userEmail=${userEmail}&weekNumber=${weekNumber}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Week object already exists.");
          const dataExists = data.some(
            (item) =>
              item.userEmail === userEmail && item.weekNumber === weekNumber
          );
          return dataExists;
        } else {
          console.error("Error fetching data:", response.status);
          return false;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return false;
      }
    };

    const saveWeekData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.week.saveWeekData}`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName,
              userEmail,
              weekNumber,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
        } else {
          const errorData = await response.json();
          return errorData;
        }
      } catch (error) {
        console.error(error);
      }
    };

    const dataExists = await fetchData();
    console.log(dataExists);

    if (weekNumber > 0 && userEmail && !dataExists) {
      console.log("Data not found. Saving new data...");
      await saveWeekData();
    }
  } catch (error) {
    console.error(error);
  }
};
