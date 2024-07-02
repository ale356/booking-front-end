import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

/**
 * A text field React component.
 *
 * @returns {Component} a component.
 */
export default function FullWidthTextField() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Your Email:" id="fullWidth" />
    </Box>
  );
}
