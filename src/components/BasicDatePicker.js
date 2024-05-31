import React, { useContext } from 'react';
import { AppointmentContext } from '../contexts/AppointmentContext';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  const handleDateChange = (newValue) => {
    setAppointmentData({ ...appointmentData, date: newValue });
    console.log(newValue)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select a date."
        value={appointmentData.date}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
