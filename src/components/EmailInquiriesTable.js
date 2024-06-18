import React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

/**
 * Renders a table displaying email inquiries.
 *
 * @component
 * @returns {JSX.Element} TableContainer component wrapped in Paper.
 */
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
          {/* Table rows will be dynamically populated */}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default EmailInquiriesTable;
