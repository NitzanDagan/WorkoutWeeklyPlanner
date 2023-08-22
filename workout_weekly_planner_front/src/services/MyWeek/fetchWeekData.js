import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";
import { createContext, useState, useEffect } from "react";
import getWeekNumber from "./weekNumber";

const FetchWeekData = createContext();

const DataProvider = ({ children }) => {
  const [weekNumber, setWeekNumber] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail && weekNumber !== null) {
      fetch(
        `${API_BASE_URL}${API_ENDPOINTS.week.getWeekData}?userEmail=${userEmail}&weekNumber=${weekNumber}`
      )
        .then((response) => response.json())
        .then((data) => setWeekData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [userEmail, weekNumber]);

  useEffect(() => {
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumber(currentDate);
    setWeekNumber(currentWeekNumber);
  }, []);

  const dataContextValue = {
    weekData,
    weekNumber,
    userEmail,
  };
  return (
    <FetchWeekData.Provider value={dataContextValue}>
      {children}
    </FetchWeekData.Provider>
  );
};

export { FetchWeekData, DataProvider };
