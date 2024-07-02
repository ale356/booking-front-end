import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AppointmentContext } from '../contexts/AppointmentContext';

/**
 * AddressForm component for collecting personal details of the user.
 *
 * @component
 * @returns {JSX.Element} A form for entering personal details.
 */
export default function AddressForm() {
  const { personalData, setPersonalData } = useContext(AppointmentContext);

  /**
   * Handles changes to the form fields and updates the personalData state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the form field.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={personalData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={personalData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={personalData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobileNumber"
            name="mobileNumber"
            label="Mobile Number"
            fullWidth
            autoComplete="tel"
            variant="standard"
            value={personalData.mobileNumber}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
