
/* 
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

const StaticDateTimePickerWithRealTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  // Format date and time without milliseconds
  const formattedDateTime = currentDateTime.toISOString().slice(0, 19).replace('T', ' ');

  return (
    <TextField
      label="Date and Time"
      value={formattedDateTime}
      variant="standard"
      InputProps={{
        readOnly: true,
      }}
    />
  );
};

export default StaticDateTimePickerWithRealTime;
*/