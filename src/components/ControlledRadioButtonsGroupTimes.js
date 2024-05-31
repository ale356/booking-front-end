import React, { useContext } from 'react';
import { AppointmentContext } from '../contexts/AppointmentContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroupTimes() {
  const { appointmentData, setAppointmentData } = useContext(AppointmentContext);

  const handleChange = (event) => {
    const { value } = event.target;
    setAppointmentData({ ...appointmentData, time: value });
  };

  const timesToBook = ['08:00 a.m.', '10:00 a.m.', '12:00 p.m.', '02:00 p.m.', '04:00 p.m.', '06:00 p.m.'];

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Select a time.</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={appointmentData.time}
        onChange={handleChange}
      >
        {timesToBook.map((time) => (
          <FormControlLabel key={time} value={time} control={<Radio />} label={time} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
