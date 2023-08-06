import { useEffect } from "react";

const getWeekNumber = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
const WeekNumber = ({ setWeekNumber }) => {
  useEffect(() => {
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumber(currentDate);
    setWeekNumber(currentWeekNumber);
  }, [setWeekNumber]);

  return null;
};

export default WeekNumber;
