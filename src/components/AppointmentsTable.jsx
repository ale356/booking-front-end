import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

/**
 * Displays a table of appointments with options to edit or delete each appointment.
 *
 * @returns {JSX.Element} Appointments table component.
 */
function AppointmentsTable() {
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

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
          Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              navigate('/login');
            }
            throw new Error('Network response was not ok');
          }

          const appointmentData = await response.json();

          const appointmentsWithServiceNames = await Promise.all(
            appointmentData.map(async (appointment) => {
              const serviceName = await fetchServiceName(appointment.serviceId);
              return {
                ...appointment,
                serviceName,
              };
            }),
          );
          setAppointments(appointmentsWithServiceNames);
        } catch (error) {
          console.error('Error fetching appointments:', error);
          setFetchError('Error fetching appointments');
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleEditClick = (appointment) => {
    navigate(`/editAppointment/${appointment.id}`);
  };

  const handleDeleteClick = (appointment) => {
    navigate(`/deleteAppointment/${appointment.id}`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (fetchError) {
    return (
      <Typography variant="h6" align="center" color="error">
        Error:
        {fetchError}
      </Typography>
    );
  }

  if (appointments.length === 0) {
    return <Typography variant="h6" align="center">No appointments found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="appointments table">
        <TableHead>
          <TableRow>
            <BoldTableCell>Appointment ID</BoldTableCell>
            <BoldTableCell align="right">Service Name</BoldTableCell>
            <BoldTableCell align="right">Time</BoldTableCell>
            <BoldTableCell align="right">First Name</BoldTableCell>
            <BoldTableCell align="right">Last Name</BoldTableCell>
            <BoldTableCell align="right">Mobile Number</BoldTableCell>
            <BoldTableCell align="right">Email</BoldTableCell>
            <BoldTableCell align="right" />
            <BoldTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell component="th" scope="row">
                {appointment.id}
              </TableCell>
              <TableCell align="right">{appointment.serviceName}</TableCell>
              <TableCell align="right">{appointment.time}</TableCell>
              <TableCell align="right">{appointment.firstName}</TableCell>
              <TableCell align="right">{appointment.lastName}</TableCell>
              <TableCell align="right">{appointment.mobileNumber}</TableCell>
              <TableCell align="right">{appointment.email}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => handleEditClick(appointment)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" onClick={() => handleDeleteClick(appointment)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}

export default AppointmentsTable;
