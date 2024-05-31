import { Box } from '@mui/system'
import React from 'react'
import customTheme from '../customTheme'

/**
 * A hero banner React component.
 *
 * @returns {Component} a component.
 */
const HeroBanner = () => {
  return (
    <div>
      <Box 
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`,
          height: "500px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "4rem",
          [customTheme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em" }
      }}>
        <Box>
        HealthPlus Clinic
        </Box>
      </Box>
    </div>
  )
}

export default HeroBanner