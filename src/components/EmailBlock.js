import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FullWidthTextField from './FullWidthTextField';

/**
 * A email block React component.
 *
 * @returns {Component} a component.
 */
export default function EmailBlock() {
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
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Get Email Updates & Offers.
            </Typography>
            <Box sx={{
                    display:'flex',
                    justifyContent:"center",
            }}>
            <FullWidthTextField></FullWidthTextField>
            </Box>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button fullWidth id="fullWidth" variant="contained">Sign Me Up!</Button>
            </Stack>
          </Container>
        </Box>
      </main>
  );
}