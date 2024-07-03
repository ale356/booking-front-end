/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Typography, Button, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import customTheme from '../functions/customTheme';
import AppointmentsTable from '../components/AppointmentsTable';
import ServicesTable from '../components/ServicesTable';
import EmailListTable from '../components/EmailListTable';
import ContactRequestsTable from '../components/ContactRequestsTable';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * Represents the admin page component.
 *
 * @returns {JSX.Element} The admin page component.
 */
function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [visibleTable, setVisibleTable] = useState('appointments');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      // Load the initial visible table from localStorage.
      const savedVisibleTable = localStorage.getItem('visibleTable');
      if (savedVisibleTable) {
        setVisibleTable(savedVisibleTable);
      }
    }
  }, []);

  /**
   * Logs out the user.
   */
  const handleLogout = async () => {
    try {
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  /**
   * Navigates to the theme color change page.
   */
  const handleChangeThemeColor = () => {
    navigate('/changeThemeColor');
  };

  /**
   * Toggles the visible table.
   *
   * @param {string} tableName - The name of the table to display.
   */
  const handleToggleTable = (tableName) => {
    setVisibleTable(tableName);
    localStorage.setItem('visibleTable', tableName);
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3),
        }}
      >
        Admin Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" m={2}>
        <Button color="secondary" variant="contained" sx={{ mr: 2 }} onClick={handleChangeThemeColor}>
          Change Theme Color
        </Button>
        <Button color="secondary" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" m={2}>
        <Button variant="contained" onClick={() => handleToggleTable('appointments')}>
          Show Appointments
        </Button>
        <Button variant="contained" onClick={() => handleToggleTable('services')} sx={{ ml: 2 }}>
          Show Services
        </Button>
        <Button variant="contained" onClick={() => handleToggleTable('emails')} sx={{ ml: 2 }}>
          Show Emails
        </Button>
        <Button variant="contained" onClick={() => handleToggleTable('contactRequests')} sx={{ ml: 2 }}>
          Show Contact Requests
        </Button>
      </Box>

      {visibleTable === 'appointments' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ ...customTheme.typography.h5, textAlign: 'center', paddingTop: customTheme.spacing(2) }}>
            Appointments
          </Typography>
          <AppointmentsTable />
        </>
      )}

      {visibleTable === 'services' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ ...customTheme.typography.h5, textAlign: 'center', paddingTop: customTheme.spacing(2) }}>
            Services
          </Typography>
          <ServicesTable />
        </>
      )}

      {visibleTable === 'emails' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ ...customTheme.typography.h5, textAlign: 'center', paddingTop: customTheme.spacing(2) }}>
            Email List
          </Typography>
          <EmailListTable />
        </>
      )}

      {visibleTable === 'contactRequests' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ ...customTheme.typography.h5, textAlign: 'center', paddingTop: customTheme.spacing(2) }}>
            Contact Requests
          </Typography>
          <ContactRequestsTable />
        </>
      )}
    </div>
  );
}

export default AdminPage;
