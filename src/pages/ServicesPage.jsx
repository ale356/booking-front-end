import React from 'react';
import { Typography, Container } from '@mui/material';
import customTheme from '../functions/customTheme';
import ServiceContainer from '../components/ServiceContainer';

/**
 * Represents the ServicesPage component, displaying a list of services.
 *
 * @component
 * @returns {JSX.Element} The rendered ServicesPage component.
 */
function ServicesPage() {
  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: customTheme.spacing(3),
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            paddingTop: customTheme.spacing(3),
            paddingBottom: customTheme.spacing(3),
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Our Services
        </Typography>

        <ServiceContainer />

      </Container>
    </div>
  );
}

export default ServicesPage;
