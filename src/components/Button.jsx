import PropTypes from 'prop-types';

/**
 * A button React component.
 *
 * @returns {Component} a component.
 */
function Button({ color, text, onClick }) {
  return (
    <button
      className="btn"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  color: 'green',
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
