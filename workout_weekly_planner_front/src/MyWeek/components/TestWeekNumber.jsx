// const fetchData = useCallback(async () => {
//   try {
//     const response = await fetch(
//       `http://localhost:3006/routes/week/getWeekData?userEmail=${userEmail}&weekNumber=${weekNumber}`,
//       {
//         method: "get",
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       setDataExists(!!data);
//       console.log("data here func");
//       console.log(dataExists);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }, [userEmail, weekNumber]);
