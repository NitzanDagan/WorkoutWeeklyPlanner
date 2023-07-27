import React, { useEffect, useState } from "react";

function CheckAndSaveWeekData({ weekNumber }) {
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const [dataExists, setDataExists] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3006/routes/week/getWeekData?userEmail=${userEmail}&weekNumber=${weekNumber}`
        );
        const data = await response.json();
        console.log("week object already exist");
        // console.log("Fetched Data:", data);

        const dataExists = data.some(
          (item) =>
            item.userEmail === userEmail && item.weekNumber === weekNumber
        );
        setDataExists(dataExists);
        setDataFetched(true);
      } catch (error) {
        console.error(error);
      }
    };
    if (weekNumber > 0 && userEmail && !dataFetched) {
      fetchData();
    }
  }, [userEmail, weekNumber, dataFetched]);

  useEffect(() => {
    const saveWeekData = async () => {
      if (weekNumber > 0 && userEmail && !dataExists && dataFetched) {
        console.log("Data not found. Saving new data...");
        try {
          const response = await fetch(
            "http://localhost:3006/routes/week/saveWeekData",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName,
                userEmail,
                weekNumber,
                selectedCount: 0,
                checkedCount: 0,
                closedCount: 0,
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
    if (!dataExists) {
      saveWeekData();
    }
  }, [userEmail, weekNumber, dataExists, dataFetched, userName]);
}

export default React.memo(CheckAndSaveWeekData);