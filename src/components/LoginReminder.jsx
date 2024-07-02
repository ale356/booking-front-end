import React from 'react';
import { Typography, Link } from '@mui/material';

/**
 * Renders a message prompting the user to log in to access admin functionality.
 *
 * @component
 * @returns {JSX.Element} The LoginReminder component.
 */
function LoginReminder() {
  return (
    <div>
      <Typography variant="h5" align="center" mt={5} gutterBottom>
        Please
        {' '}
        <Link href="/login">log in</Link>
        {' '}
        to access the admin functionality.
      </Typography>
    </div>
  );
}

export default LoginReminder;
