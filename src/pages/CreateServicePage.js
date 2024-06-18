import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Represents the CreateServicePage component, allowing admins to create new services.
 *
 * @component
 * @returns {JSX.Element} The JSX.Element representing the CreateServicePage component.
 */
const CreateServicePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: {
      amount: '',
      currency: 'USD'
    },
    durationInMinutes: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles changes in form inputs.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'amount' || name === 'currency') {
      setFormData(prevState => ({
        ...prevState,
        price: {
          ...prevState.price,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  /**
   * Submits the form to create a new service.
   *
   * @param {Object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('Access token not found. Please log in.');
      return;
    }

    try {
      const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Service created successfully!');
        setTimeout(() => navigate('/admin'), 2000); // Redirect back to admin page after 2 seconds
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography my={3} component="h1" variant="h4">
          Create Service
        </Typography>
        <Box my={2}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Service Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="amount"
                label="Price Amount"
                name="amount"
                type="number"
                value={formData.price.amount}
                onChange={handleChange}
                inputProps={{ min: 0 }} // Ensure amount is >= 0
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  id="currency"
                  name="currency"
                  value={formData.price.currency}
                  onChange={handleChange}
                  label="Currency"
                >
                  {['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'NZD', 'DKK', 'NOK', 'SEK'].map(currency => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="durationInMinutes"
                label="Duration in Minutes"
                name="durationInMinutes"
                type="number"
                value={formData.durationInMinutes}
                onChange={handleChange}
                inputProps={{ min: 1 }} // Ensure duration is > 0
              />
            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
              <Button
                variant="contained"
                onClick={() => navigate('/admin')}
              >
                Go Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Service
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default CreateServicePage;
