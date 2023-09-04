export const handleWorkoutChange = (
  event,
  setWorkout,
  day,
  handleUpdateWorkout,
  updateSelectedCount,
  setSelectedWorkout
) => {
  const selectedWorkout = event.target.value;
  if (selectedWorkout) {
    setWorkout(selectedWorkout);
    updateSelectedCount();
    handleUpdateWorkout(day, selectedWorkout);
    setSelectedWorkout(selectedWorkout);
  }
};

export const updateSelectedCount = (setSelectedCount) => {
  setSelectedCount((prevCount) => prevCount + 1);
};

export const updateClosedCount = (setClosedCount) => {
  setClosedCount((prevCount) => prevCount + 1);
};

export const updateCheckedCount = (setCheckedCount) => {
  setCheckedCount((prevCount) => prevCount + 1);
};
