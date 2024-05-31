import React from 'react'
import customTheme from '../customTheme'
import ServiceContainer from '../components/ServiceContainer'
import { Typography } from '@mui/material'
import { Container } from '@mui/material'

const ServicesPage = () => {

  return (
    <div>
      <Container maxWidth="lg" sx={{
        paddingTop: customTheme.spacing(3)
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 800,
          paddingTop: customTheme.spacing(3),
          paddingBottom: customTheme.spacing(3),
          display: "flex",
          justifyContent: "center"
        }}>
          Our Services
          </Typography>

          <ServiceContainer/>

    </Container >
  </div >
  )
}

export default ServicesPage