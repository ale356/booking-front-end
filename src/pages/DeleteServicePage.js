import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import customTheme from '../functions/customTheme';
import { styled } from '@mui/material/styles';

/**
 * Deletes a service identified by ID.
 *
 * @returns {JSX.Element} JSX element representing the DeleteServicePage component.
 */

const DeleteServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const BoldTableCell = styled(TableCell)({
    fontWeight: 'bold',
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/services/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        // No content, successful deletion
        setSuccess('Service successfully deleted.');
        setTimeout(() => navigate('/admin'), 2000); // Redirect back to admin page after 2 seconds
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setError('Failed to delete service. Please try again.');
    }
  };

  if (!service) {
    return (
      <Typography variant="h5" align="center" mt={5} gutterBottom>
        Loading...
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography variant="h4" sx={{ ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3) }}>Delete Service</Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="body1" gutterBottom mb={2} mt={2} align="center" fontWeight="bold">
        Are you sure you want to delete the service with ID: {service.id}?
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <BoldTableCell>Field</BoldTableCell>
              <BoldTableCell>Value</BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(service).map(([key, value]) => (
              key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' &&(
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{typeof value !== 'object' ? value.toString() : value.amount.toString() + ' ' + value.currency.toString()}</TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin')}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteServicePage;
