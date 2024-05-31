import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PropTypes from 'prop-types';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const AppointmentsTable = ({ appointments }) => {
  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="appointments table">
        <TableHead>
          <TableRow>
            <BoldTableCell>Appointment ID</BoldTableCell>
            <BoldTableCell align="right">Service ID</BoldTableCell>
            <BoldTableCell align="right">Time</BoldTableCell>
            <BoldTableCell align="right">First Name</BoldTableCell>
            <BoldTableCell align="right">Last Name</BoldTableCell>
            <BoldTableCell align="right">Mobile Number</BoldTableCell>
            <BoldTableCell align="right">Email</BoldTableCell>
            <BoldTableCell align="right">Action</BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell component="th" scope="row">
                {appointment.id}
              </TableCell>
              <TableCell align="right">{appointment.serviceId}</TableCell>
              <TableCell align="right">{appointment.time}</TableCell>
              <TableCell align="right">{appointment.firstName}</TableCell>
              <TableCell align="right">{appointment.lastName}</TableCell>
              <TableCell align="right">{appointment.mobileNumber}</TableCell>
              <TableCell align="right">{appointment.email}</TableCell>
              <TableCell align="right">
                <span>Edit/Delete</span>
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
