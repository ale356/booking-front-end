import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Box, TextField,
} from '@mui/material';
import customTheme from '../functions/customTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * Represents the EditContactRequestPage component for updating
 * contact request details.
 *
 * @component
 * @returns {JSX.Element} The JSX markup for the component.
 */
function EditContactRequestPage() {
  const { id } = useParams();
  const [contactRequest, setContactRequest] = useState({ email: '', message: '' });
  const [newEmail, setNewEmail] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactRequest = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/contactRequests/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContactRequest(data);
        setNewEmail(data.email);
        setNewMessage(data.message);
      } catch (fetchError) {
        console.error('Error fetching contact request:', fetchError);
      }
    };
    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      fetchContactRequest();
    }
  }, [id]);

  /**
   * Validates the format of an email address.
   *
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is valid, otherwise false.
   */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  /**
   * Handles the update of the contact request by sending a PUT request.
   */
  const handleUpdate = async () => {
    const token = localStorage.getItem('accessToken');
    if (!newEmail || !newMessage) {
      setError('Please fill in both the email and message fields.');
      return;
    }
    if (!validateEmail(newEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/contactRequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail, message: newMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        navigate('/admin');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (updateError) {
      console.error('Error updating contact request:', updateError);
      setError('Failed to update contact request. Please check your input.');
    }
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  if (!contactRequest.email) {
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
        Edit Contact Request
      </Typography>
      <TextField
        fullWidth
        label="Current Email"
        value={contactRequest.email}
        disabled
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Current Message"
        value={contactRequest.message}
        disabled
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="New Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="New Message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        multiline
        rows={4}
        sx={{ mt: 2 }}
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

export default EditContactRequestPage;
