import { createContext, useState, useEffect, useContext } from "react";

const FetchWeekData = createContext();

const DataProvider = ({ children }) => {
  const [weekData, setWeekData] = useState(null);
  const weekNumber = 32;
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch(
      `http://localhost:3006/routes/week/getWeekData?userEmail=${userEmail}&weekNumber=${weekNumber}`
    )
      .then((response) => response.json())
      .then((data) => setWeekData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userEmail, weekNumber]);

  return (
    <FetchWeekData.Provider value={weekData}>{children}</FetchWeekData.Provider>
  );
};

export { FetchWeekData, DataProvider };
