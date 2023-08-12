// import React, { useEffect, useContext } from "react";
// import { FetchWeekData } from "../../../services/MyWeek/fetchWeekData";

// function UpdateWeekData({
//   weekNumber,
//   selectedCount,
//   checkedCount,
//   closedCount,
// }) {
//   const userEmail = localStorage.getItem("userEmail");
//   const weekData = useContext(FetchWeekData);

//   useEffect(() => {
//     const updateCounts = async () => {
//       if (weekNumber > 0 && userEmail && weekData) {
//         try {
//           const response = await fetch(
//             "http://localhost:3006/routes/week/updateCounts",
//             {
//               method: "post",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 userEmail: userEmail,
//                 weekNumber: weekNumber,
//                 selectedCount: selectedCount,
//                 checkedCount: checkedCount,
//                 closedCount: closedCount,
//               }),
//             }
//           );

//           const data = await response.json();
//           console.log(data.message);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };
//     updateCounts();
//   }, [
//     checkedCount,
//     closedCount,
//     selectedCount,
//     userEmail,
//     weekData,
//     weekNumber,
//   ]);
// }

// export default React.memo(UpdateWeekData);
