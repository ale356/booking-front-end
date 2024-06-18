import React, { useContext } from 'react';
import { AppointmentContext } from '../contexts/AppointmentContext';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import AppointmentForm from './AppointmentForm';
import Review from './Review';

// Define the steps of the appointment process.
const steps = ['Choose Appointment', 'Personal Details', 'Review Your Appointment'];

// Create a MUI theme for the component.
const theme = createTheme();

/**
 * Represents the Appointment component, which guides the user through
 * the appointment booking process.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Appointment() {
  const [activeStep, setActiveStep] = React.useState(0);

  // Retrieve data from the AppointmentContext.
  const { appointmentData, personalData } = useContext(AppointmentContext);

  /**
   * Advances to the next step in the appointment process.
   */
  const handleNext = () => {
    // If on the last step, initiate a POST request to submit the appointment.
    if (activeStep === steps.length - 1) {
      const url = 'https://onedv613-restful-api.onrender.com/api/v1/appointments';

      const data = {
        serviceId: appointmentData.serviceId,
        time: appointmentData.dateTime.toISOString(),
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        mobileNumber: personalData.mobileNumber,
        email: personalData.email,
      };

      postData(url, data);
    }

    setActiveStep(activeStep + 1);
  };

  /**
   * Moves back to the previous step in the appointment process.
   */
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  /**
   * Sends a POST request to submit appointment data to the server.
   *
   * @param {string} url - The URL to send the POST request to.
   * @param {object} data - The data to include in the POST request body.
   */
  const postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      // Handle the response data as needed.
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  /**
   * Renders the content of the current step in the appointment process.
   *
   * @param {number} step - The current step index.
   * @returns {JSX.Element} The component corresponding to the current step.
   * @throws {Error} Throws an error if the step index is unknown.
   */
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AppointmentForm />;
      case 1:
        return <AddressForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Appointment
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your appointment.
                </Typography>
                <Typography variant="subtitle1">
                  Your appointment number is #239. We have emailed your appointment
                  confirmation, and will send you an update when your appointment has
                  been confirmed.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Request Appointment' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
