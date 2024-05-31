import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import H4Title from '../components/H4Title';

const ContactUsPage = () => {
  return (
    <main>
      <Box sx={{ bgcolor: 'background.paper', pt: 3 }}>
        <Container maxWidth="sm">
          <H4Title text="Contact Us"></H4Title>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            For any inquiries or appointments, please feel free to contact us using the information below:
            <br />
            Email: info@healthplusclinic.com
            <br />
            Phone: +1 (123) 456-7890
            <br />
            Address: 123 Medical Boulevard, City, State, 12345
            <br />
            Opening Hours: Monday-Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 3:00 PM, Sunday: Closed
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="email"
              label="Your Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              id="message"
              label="Your Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" fullWidth>
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </main>
  );
};

export default ContactUsPage;
