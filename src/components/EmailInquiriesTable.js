import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const EmailInquiriesTable = () => {
  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="email inquiries table">
        <TableHead>
          <TableRow>
            <BoldTableCell>Inquiry ID</BoldTableCell>
            <BoldTableCell align="right">Sender Email</BoldTableCell>
            <BoldTableCell align="right">Message</BoldTableCell>
            <BoldTableCell align="right">Action</BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default EmailInquiriesTable;
