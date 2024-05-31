import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Link } from '@mui/material';
import customTheme from '../customTheme';
import AppointmentsTable from '../components/AppointmentsTable';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); // Assume user is not logged in initially
  const navigate = useNavigate();

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/appointments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            // If unauthorized or token expired, setLoggedIn to false
            if (response.status === 401 || response.status === 403) {
              setLoggedIn(false);
            }
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setAppointments(data); // Update state with fetched appointments
          setLoggedIn(true); // If fetch is successful, set user as logged in
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      } else {
        setLoggedIn(false); // If token doesn't exist, setLoggedIn to false
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      // Remove JWT token from local storage
      localStorage.removeItem('accessToken');
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  };

  if (!loggedIn) {
    return (
      <div> 
        <Typography variant="h5" align="center" mt={5} gutterBottom>
          Please <Link href="/login">log in</Link> to access the admin dashboard.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3) }}>
        Admin Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ ...customTheme.typography.h5, textAlign: 'center', paddingTop: customTheme.spacing(2) }}>
        Appointments
      </Typography>
      <AppointmentsTable appointments={appointments} />
    </div>
  );
};

export default AdminPage;
