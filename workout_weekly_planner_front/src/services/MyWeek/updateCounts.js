import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";

export const updateCounts = async ({
  weekNumber,
  userEmail,
  selectedCount,
  checkedCount,
  closedCount,
}) => {
  if (
    weekNumber > 0 &&
    userEmail &&
    (selectedCount > 0 || checkedCount > 0 || closedCount > 0)
  ) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.week.updateCounts}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weekNumber,
            userEmail,
            selectedCount,
            checkedCount,
            closedCount,
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
