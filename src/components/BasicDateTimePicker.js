import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function BasicDateTimePicker() {

  return (
    <FormControl margin="normal" fullWidth>
      <FormLabel>Select Date and Time</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
