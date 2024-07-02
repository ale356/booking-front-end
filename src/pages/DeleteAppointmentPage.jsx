import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Typography, Button, Box, Alert, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import customTheme from '../functions/customTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * Deletes an appointment from the server.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the delete appointment page.
 */
function DeleteAppointmentPage() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const navigate = useNavigate();
  const BoldTableCell = styled(TableCell)({
    fontWeight: 'bold',
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/appointments/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointment(data);

        // Fetch service name.
        if (data.serviceId) {
          const serviceResponse = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/services/${data.serviceId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!serviceResponse.ok) {
            throw new Error('Network response was not ok');
          }
          const serviceData = await serviceResponse.json();
          setServiceName(serviceData.name);
        }
      } catch (fetchError) {
        console.error('Error fetching appointment:', fetchError);
      }
    };
    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      fetchAppointment();
    }
  }, [id]);

  /**
   * Handles deletion of the appointment.
   */
  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        // No content, successful deletion.
        setSuccess('Appointment successfully deleted.');
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (deleteError) {
      console.error('Error deleting appointment:', deleteError);
      setError('Failed to delete appointment. Please try again.');
    }
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  if (!appointment) {
    return (
      <Typography variant="h5" align="center" mt={5} gutterBottom>
        Loading...
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography
        variant="h4"
        sx={{
          ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3),
        }}
      >
        Delete Appointment
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="body1" gutterBottom mb={2} mt={2} align="center" fontWeight="bold">
        Are you sure you want to delete the appointment with ID:
        {' '}
        {appointment.id}
        ?
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <BoldTableCell>Field</BoldTableCell>
              <BoldTableCell>Value</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(appointment).map(([key, value]) => (
              key !== 'serviceId' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value.toString()}</TableCell>
                </TableRow>
              )
            ))}
            <TableRow>
              <TableCell>serviceName</TableCell>
              <TableCell>{serviceName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin')}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteAppointmentPage;
