import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Box, TextField, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import customTheme from '../functions/customTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * Represents a page for editing service details.
 *
 * @component
 * @returns {JSX.Element} EditServicePage component
 */
function EditServicePage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Fetches the service data from the server based on the ID parameter.
   */
  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/services/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setService(data);
      } catch (fetchError) {
        console.error('Error fetching service:', fetchError);
      }
    };
    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      fetchService();
    }
  }, [id]);

  /**
   * Handles the update operation for the selected field.
   * Sends a PUT request to update the service data.
   */
  const handleUpdate = async () => {
    const token = localStorage.getItem('accessToken');
    if (!editField || !editValue) {
      setError('Please select a field and enter a new value.');
      return;
    }

    try {
      let updateData;
      if (editField === 'price') {
        // For the price field, split the editValue into amount and currency.
        if (!editValue || !selectedCurrency) {
          setError('Please enter both amount and select a currency.');
          return;
        }
        updateData = { price: { amount: editValue, currency: selectedCurrency } };
      } else {
        // For other fields, directly update the field with the editValue.
        updateData = { [editField]: editValue };
      }

      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        // No content, successful update.
        navigate('/admin');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (updateError) {
      console.error('Error updating service:', updateError);
      setError('Failed to update service. Please check your input.');
    }
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  if (!service) {
    return (
      <Typography variant="h5" align="center" mt={5} gutterBottom>
        Loading...
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography
        variant="h4"
        sx={{
          ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3),
        }}
      >
        Edit Service
      </Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Field</InputLabel>
        <Select
          value={editField}
          onChange={(e) => setEditField(e.target.value)}
        >
          {Object.keys(service).map((key) => (
            key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && <MenuItem key={key} value={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {editField === 'price' && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Currency</InputLabel>
          <Select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {/* Add options for currency selection. */}
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="CHF">CHF</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
            <MenuItem value="AUD">AUD</MenuItem>
            <MenuItem value="NZD">NZD</MenuItem>
            <MenuItem value="DKK">DKK</MenuItem>
            <MenuItem value="NOK">NOK</MenuItem>
            <MenuItem value="SEK">SEK</MenuItem>
          </Select>
        </FormControl>
      )}
      <TextField
        fullWidth
        label="New Value"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{ style: { marginTop: '8px', marginBottom: '8px' } }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" justifyContent="flex-start" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin')}
        >
          Go Back
        </Button>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ marginLeft: '16px' }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditServicePage;
