/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

/**
 * A text quote React component.
 *
 * @param {string} text - The text content to be displayed.
 * @returns {Component} a component.
 */
function TextQuote({ text }) {
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 3,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {text}
          </Typography>
        </Container>
      </Box>
    </main>
  );
}

export default TextQuote;
