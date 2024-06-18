import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

/**
 * Displays a table of contact requests fetched from the server.
 *
 * @component
 * @returns {JSX.Element} The ContactRequestsTable component.
 */
const ContactRequestsTable = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactRequests = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/contactRequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setContactRequests(data);
        } else {
          throw new Error('Failed to fetch contact requests');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactRequests();
  }, []);

  /**
   * Navigates to the edit page for a specific contact request.
   *
   * @param {object} request - The contact request object to edit.
   */
  const handleEditClick = (request) => {
    navigate(`/editContactRequest/${request.id}`);
  };

  /**
   * Navigates to the delete page for a specific contact request.
   *
   * @param {object} request - The contact request object to delete.
   */
  const handleDeleteClick = (request) => {
    navigate(`/deleteContactRequest/${request.id}`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">Error: {error}</Typography>;
  }

  if (contactRequests.length === 0) {
    return <Typography variant="h6" align="center">No contact requests found</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label="contact requests table">
        <TableHead>
          <TableRow>
            <BoldTableCell>Email</BoldTableCell>
            <BoldTableCell>Message</BoldTableCell>
            <BoldTableCell align="right"></BoldTableCell>
            <BoldTableCell align="right"></BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell component="th" scope="row">
                {request.email}
              </TableCell>
              <TableCell>
                {request.message}
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => handleEditClick(request)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" onClick={() => handleDeleteClick(request)}>
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

export default ContactRequestsTable;
