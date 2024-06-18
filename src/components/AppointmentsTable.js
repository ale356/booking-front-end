import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
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
const AppointmentsTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [appointmentData, setAppointmentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/appointments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setAppointmentData(data);
        } else {
          throw new Error('Failed to fetch appointments');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleEditClick = (appointment) => {
    navigate(`/editAppointment/${appointment.id}`);
  };

  const handleDeleteClick = (appointment) => {
    navigate(`/deleteAppointment/${appointment.id}`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">Error: {error}</Typography>;
  }

  if (appointmentData.length === 0) {
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
            <BoldTableCell align="right"></BoldTableCell>
            <BoldTableCell align="right"></BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointmentData.map((appointment) => (
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
};

AppointmentsTable.propTypes = {
  appointments: PropTypes.array.isRequired,
};

export default AppointmentsTable;
