import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const BoldTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

/**
 * Displays a table of services with options to edit or delete each service.
 *
 * @component
 */
const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/services', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setServices(data);
        } else {
          throw new Error('Failed to fetch services');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /**
   * Redirects to the create service page.
   */
  const handleCreateServiceClick = () => {
    navigate('/createService');
  };

  /**
   * Redirects to the edit service page for a specific service.
   *
   * @param {object} service - The service object to edit.
   */
  const handleEditClick = (service) => {
    navigate(`/editService/${service.id}`);
  };

  /**
   * Redirects to the delete service page for a specific service.
   *
   * @param {object} service - The service object to delete.
   */
  const handleDeleteClick = (service) => {
    navigate(`/deleteService/${service.id}`);
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">Error: {error}</Typography>;
  }

  if (services.length === 0) {
    return <Typography variant="h6" align="center">No services found</Typography>;
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" my={4}>
        <Button variant="contained" color="primary" onClick={handleCreateServiceClick}>
          Create Service
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <StyledTable aria-label="services table">
          <TableHead>
            <TableRow>
              <BoldTableCell>Service ID</BoldTableCell>
              <BoldTableCell align="right">Service Name</BoldTableCell>
              <BoldTableCell align="right">Description</BoldTableCell>
              <BoldTableCell align="right">Price</BoldTableCell>
              <BoldTableCell align="right">Duration In Minutes</BoldTableCell>
              <BoldTableCell align="right"></BoldTableCell>
              <BoldTableCell align="right"></BoldTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell component="th" scope="row">
                  {service.id}
                </TableCell>
                <TableCell align="right">{service.name}</TableCell>
                <TableCell align="right">{service.description}</TableCell>
                <TableCell align="right">
                  {`${service.price.amount} ${service.price.currency}`}
                </TableCell>
                <TableCell align="right">{service.durationInMinutes}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(service)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error" onClick={() => handleDeleteClick(service)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

ServicesTable.propTypes = {
  services: PropTypes.array.isRequired,
};

export default ServicesTable;
