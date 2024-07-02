import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppointmentContext } from '../contexts/AppointmentContext';

/**
 * Represents a basic date picker component for selecting appointment dates.
 *
 * @component
 * @returns {JSX.Element} A date picker component.
 */
export default function BasicDatePicker() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  /**
   * Handles date change events and updates appointment data.
   *
   * @param {Date} newValue - The new selected date.
   */
  const handleDateChange = (newValue) => {
    setAppointmentData({ ...appointmentData, date: newValue });
    console.log(newValue); // Log the selected date for debugging.
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
