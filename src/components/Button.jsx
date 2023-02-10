import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Button.css';

export default class Button extends Component {
  render() {
    const { text, handleClick, disabled, testId, type, image, customClass } = this.props;

    return (
      <button
        className={ customClass }
        type={ type }
        disabled={ disabled }
        onClick={ handleClick }
        data-testid={ testId }
      >
        {text}
        {image && <img src={ image } width="100%" alt="ícone" />}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  testId: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string,
  customClass: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  testId: '',
  type: 'button',
  text: '',
  image: '',
  customClass: undefined,
};
