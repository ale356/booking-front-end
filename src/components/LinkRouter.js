/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

/**
 * A link behaviour React component.
 *
 * @returns {Component} a component.
 */
const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/material-ui/getting-started/installation/" {...props} />
));

/**
 * A router React component.
 *
 * @returns {Component} a component.
 */
function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
  children: PropTypes.node,
};

/**
 * A link router React component.
 *
 * @returns {Component} a component.
 */
export default function LinkRouter() {
  return (
    <Box sx={{ typography: 'body1' }}>
      <Router>
        <Link component={RouterLink} to="/">
          With prop forwarding
        </Link>
        <br />
        <Link component={LinkBehavior}>Without prop forwarding</Link>
      </Router>
    </Box>
  );
}