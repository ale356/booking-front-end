import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Link } from '@mui/material';
import customTheme from '../functions/customTheme';
import AppointmentsTable from '../components/AppointmentsTable';
import ServicesTable from '../components/ServicesTable';
import { useNavigate } from 'react-router-dom';
import EmailListTable from '../components/EmailListTable';
import ContactRequestsTable from '../components/ContactRequestsTable';

/**
 * Represents the admin page component.
 *
 * @returns {JSX.Element} The admin page component.
 */
const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [visibleTable, setVisibleTable] = useState('appointments');
  const navigate = useNavigate();

  // Load the initial visible table from localStorage.
  useEffect(() => {
    const savedVisibleTable = localStorage.getItem('visibleTable');
    if (savedVisibleTable) {
      setVisibleTable(savedVisibleTable);
    }
  }, []);

  /**
   * Fetches the service name for a given service ID.
   *
   * @param {string} serviceId - The ID of the service to fetch the name for.
   * @returns {Promise<string>} The name of the service.
   */
  const fetchServiceName = async (serviceId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/services/${serviceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error('Error fetching service name:', error);
      return 'Unknown Service';
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
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
            if (response.status === 401 || response.status === 403) {
              setLoggedIn(false);
            }
            throw new Error('Network response was not ok');
          }

          const appointmentData = await response.json();

          const appointmentsWithServiceNames = await Promise.all(appointmentData.map(async (appointment) => {
            const serviceName = await fetchServiceName(appointment.serviceId);
            return {
              ...appointment,
              serviceName,
            };
          }));
          setAppointments(appointmentsWithServiceNames);
          setLoggedIn(true);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      } else {
        setLoggedIn(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/services', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              setLoggedIn(false);
            }
            throw new Error('Network response was not ok');
          }

          const serviceData = await response.json();
          setServices(serviceData);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      } else {
        setLoggedIn(false);
      }
    };

    fetchServices();
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
          <ServicesTable services={services} />
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
};

export default AdminPage;
