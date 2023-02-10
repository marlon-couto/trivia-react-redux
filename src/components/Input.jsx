import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Input.css';

export default class Input extends Component {
  render() {
    const { label, handleChange, name, type, value, testId, placeholder } = this.props;

    return (
      <label htmlFor={ name }>
        { label }
        <input
          type={ type }
          placeholder={ placeholder }
          name={ name }
          id={ name }
          data-testid={ testId }
          value={ value }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

Input.propTypes = {
  testId: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  testId: '',
  placeholder: '',
};
