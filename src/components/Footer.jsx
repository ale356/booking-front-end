import { Link } from 'react-router-dom';

/**
 * A footer React component.
 *
 * @returns {Component} a component.
 */
function Footer() {
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      <Link to="/about">About</Link>
    </footer>
  );
}

export default Footer;
