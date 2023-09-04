import React, { useState } from "react";
import { Popover, FormControl, InputLabel, Input, Button } from "@mui/material";

const DurationPopover = ({
  open,
  anchorEl,
  handleClosePopover,
  handleUpdateWorkout,
  day,
  selectedWorkout,
}) => {
  const [draftWorkoutDuration, setDraftWorkoutDuration] = useState("");

  const handleSendClick = () => {
    handleUpdateWorkout(day, selectedWorkout, {
      duration: draftWorkoutDuration,
    });
    handleClosePopover();
  };

  return (
    <Popover open={open} anchorEl={anchorEl} onClose={handleClosePopover}>
      <FormControl sx={{ p: 2, width: 300, height: 150 }}>
        <InputLabel>Enter workout time in minutes</InputLabel>
        <Input
          type="number"
          value={draftWorkoutDuration}
          onChange={(event) => setDraftWorkoutDuration(event.target.value)}
        />
        <Button variant="contained" onClick={handleSendClick}>
          Send
        </Button>
      </FormControl>
    </Popover>
  );
};

export default DurationPopover;
