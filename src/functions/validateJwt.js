import { jwtDecode } from 'jwt-decode';

/**
 * Checks if the token is expired.
 *
 * @param {string} token - The JWT token.
 * @returns {boolean} True if the token is expired, false otherwise.
 */
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Validates the JWT token and redirects to login if invalid.
 *
 * @returns {boolean} True if the token is valid, false otherwise.
 */
const validateJwt = () => {
  const token = localStorage.getItem('accessToken');
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('accessToken');
    return false;
  }

  return true;
};

export default validateJwt;
