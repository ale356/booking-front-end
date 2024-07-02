import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import H4Title from '../components/H4Title';

/**
 * Represents the Contact Us page component for user inquiries.
 *
 * @component
 * @returns {JSX.Element} JSX for Contact Us page component.
 */
function ContactUsPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Validates an email address.
   *
   * @param {string} emailString - The email address to validate.
   * @returns {boolean} Whether the email is valid.
   */
  const validateEmail = (emailString) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailString);
  };

  /**
   * Handles form submission for sending a contact request.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !message) {
      setError('Both fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (message.length < 10) {
      setError('Message should be at least 10 characters long.');
      return;
    }

    try {
      const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/contactRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess('Your message has been sent successfully.');
      setEmail('');
      setMessage('');
    } catch (submitError) {
      console.error('Error sending contact request:', submitError);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <main>
      <Box sx={{ bgcolor: 'background.paper', pt: 3 }}>
        <Container maxWidth="sm">
          <H4Title text="Contact Us" />
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            For any inquiries or appointments,
            please feel free to contact us using the information below:
            <br />
            Email: info@healthplusclinic.com
            <br />
            Phone: +1 (123) 456-7890
            <br />
            Address: 123 Medical Boulevard, City, State, 12345
            <br />
            Opening Hours: Monday-Friday: 8:00 AM - 6:00 PM,
            Saturday: 9:00 AM - 3:00 PM, Sunday: Closed
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Your Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="message"
              label="Your Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </main>
  );
}

export default ContactUsPage;
