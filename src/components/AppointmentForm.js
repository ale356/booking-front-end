import React, { useContext } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ControlledRadioButtonsGroupServices from './ControlledRadioButtonsGroupServices';
import { AppointmentContext } from '../contexts/AppointmentContext';

const AppointmentForm = () => {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  const handleDateTimeChange = (newDateTime) => {
    setAppointmentData({ ...appointmentData, dateTime: newDateTime.toDate() });
  };
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose Appointment
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ControlledRadioButtonsGroupServices />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select Date and Time"
              value={appointmentData.dateTime ? new Date(appointmentData.dateTime) : null}
              onChange={handleDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AppointmentForm;