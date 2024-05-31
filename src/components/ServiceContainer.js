import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Alert } from '@mui/material';
import customTheme from '../customTheme';

/**
 * A service React component.
 *
 * @returns {Component} a component.
 */
function ServiceContainer() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/services');
        if (!response.ok) {
          throw new Error('Failed to get services.');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        setError('Failed to fetch services.');
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ paddingTop: customTheme.spacing(3) }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {service.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="h2">
                      <strong>{service.price.amount} {service.price.currency}</strong> - {service.durationInMinutes}min
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {service.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ServiceContainer;
