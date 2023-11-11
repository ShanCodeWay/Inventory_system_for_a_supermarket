// StaticDateTimePickerWithRealTime.js
/*

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import TextField from '@mui/material/TextField';

const StaticDateTimePickerWithRealTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(dayjs());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(dayjs());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        value={currentDateTime}
        onChange={(newValue) => setCurrentDateTime(newValue)}
        renderInput={(props) => <TextField {...props} variant="standard" />}
      />
    </LocalizationProvider>
  );
};

export default StaticDateTimePickerWithRealTime;
*/