import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Grid, Card, CardActionArea, CardContent, Alert,
} from '@mui/material';
import customTheme from '../functions/customTheme';

/**
 * Fetches and displays a list of services.
 *
 * @returns {JSX.Element} Component rendering a list of services.
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
      } catch (useEffectError) {
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
              <Card sx={{ maxWidth: '100%' }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {service.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="h2">
                      <strong>
                        {service.price.amount}
                        {' '}
                        {service.price.currency}
                      </strong>
                      {' '}
                      -
                      {service.durationInMinutes}
                      min
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
