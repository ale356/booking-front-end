import React, { useEffect, useState } from 'react';
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
 * Displays a table of emails with options to edit or delete each email.
 *
 * @component
 * @returns {JSX.Element} The EmailListTable component.
 */
function EmailListTable() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/emails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setEmails(data);
        } else {
          throw new Error('Failed to fetch emails');
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  /**
   * Handles the click event for editing an email.
   *
   * @param {object} email - The email object to edit.
   */
  const handleEditClick = (email) => {
    navigate(`/editEmail/${email.id}`);
  };

  /**
   * Handles the click event for deleting an email.
   *
   * @param {object} email - The email object to delete.
   */
  const handleDeleteClick = (email) => {
    navigate(`/deleteEmail/${email.id}`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        Error:
        {error}
      </Typography>
    );
  }

  if (emails.length === 0) {
    return <Typography variant="h6" align="center">No emails found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="emails table">
        <TableHead>
          <TableRow>
            <BoldTableCell>Email</BoldTableCell>
            <BoldTableCell align="right" />
            <BoldTableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email) => (
            <TableRow key={email.id}>
              <TableCell component="th" scope="row">
                {email.email}
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => handleEditClick(email)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" onClick={() => handleDeleteClick(email)}>
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

export default EmailListTable;
