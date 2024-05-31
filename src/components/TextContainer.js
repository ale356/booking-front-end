import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import customTheme from '../customTheme'

/**
 * A text container React component.
 *
 * @returns {Component} a component.
 */
const TextContainer = () => {
  return (
    <div>
      <Box sx={{
        paddingTop: customTheme.spacing(3),
        display:'flex',
        justifyContent:"center"
      }}>
        <Typography variant='h5' sx={{
          fontWeight: 800,
          paddingBottom: customTheme.spacing(3)
        }}>
          A text quote that is quite long. Which is interesting.


        </Typography>
      </Box>
    </div>
  )
}

export default TextContainer