import React, { useContext } from 'react';
import { AppointmentContext } from '../contexts/AppointmentContext';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const packages = [
  {
    name: 'Wash Package',
    desc: '',
    price: '$70',
  },
  {
    name: 'Shine Package',
    desc: '',
    price: '$110',
  },
  {
    name: 'Premium Package',
    desc: '',
    price: '$330',
  }
];

export default function Review() {
  const { appointmentData, personalData, paymentData } = useContext(AppointmentContext);

  // Check the appointment value to decide the representation.
  const appointmentPackage = appointmentData.typeOfService
  let indexPackage = 0

  if (appointmentPackage === 'shine-package') {
    indexPackage = 1
  } else if (appointmentPackage === 'premium-package') {
    indexPackage = 2
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Appointment Summary
      </Typography>

      <Grid container spacing={2}>
        {/* Personal Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Personal Details
          </Typography>
          <List disablePadding>
            <ListItem key="first-name" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="First Name" />
              <Typography variant="body2">{personalData.firstName}</Typography>
            </ListItem>
            <ListItem key="last-name" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Last Name" />
              <Typography variant="body2">{personalData.lastName}</Typography>
            </ListItem>
            <ListItem key="email" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Email" />
              <Typography variant="body2">{personalData.email}</Typography>
            </ListItem>
            <ListItem key="mobile-number" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Mobile Number" />
              <Typography variant="body2">{personalData.mobileNumber}</Typography>
            </ListItem>
          </List>
        </Grid>

        {/* Appointment Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Appointment Details
          </Typography>
          <List disablePadding>
            <ListItem key="type-service" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Type of service" />
              <Typography variant="body2">{appointmentData.typeOfService}</Typography>
            </ListItem>
            <ListItem key="date" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Date" />
              <Typography variant="body2">{appointmentData.dateTime.toLocaleDateString()}</Typography>
            </ListItem>
            <ListItem key="time" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Time" />
              <Typography variant="body2">{appointmentData.time}</Typography>
            </ListItem>
            <ListItem key="price" sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Price" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {appointmentData.price}
              </Typography>
            </ListItem>

          </List>
        </Grid>
      </Grid>

    </React.Fragment>
  );
}
