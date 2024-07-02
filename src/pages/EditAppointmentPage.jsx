import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Alert,
} from '@mui/material';
import customTheme from '../functions/customTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * EditAppointmentPage allows administrators to modify appointment details.
 *
 * @component
 * @returns {JSX.Element} EditAppointmentPage component
 */
function EditAppointmentPage() {
  const { id } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
   * Handles updating the appointment with the new value for the selected field.
   */
  const handleUpdate = async () => {
    const token = localStorage.getItem('accessToken');
    if (!editField || !editValue) {
      setError('Please select a field and enter a new value.');
      return;
    }

    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [editField]: editValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        // No content, successful update
        navigate('/admin'); // Redirect back to admin page after update
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (updateError) {
      console.error('Error updating appointment:', updateError);
      setError('Failed to update appointment. Please check your input.');
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
        Edit Appointment
      </Typography>
      {editField === 'time' && (
        <Alert severity="info" sx={{ mt: 1 }}>
          Please enter the time in ISO format (e.g., 2022-06-30T15:30:00).
        </Alert>
      )}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Field</InputLabel>
        <Select
          value={editField}
          onChange={(e) => setEditField(e.target.value)}
        >
          {Object.keys(appointment).map((key) => (
            key !== 'serviceId' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="New Value"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{ style: { marginTop: '8px', marginBottom: '8px' } }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin')}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default EditAppointmentPage;
