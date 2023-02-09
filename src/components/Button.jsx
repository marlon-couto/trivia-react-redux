import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <div>Button</div>
    );
  }
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  testId: PropTypes.string,
  type: PropTypes.string,
};

SubmitButton.defaultProps = {
  disabled: false,
  testId: '',
  type: 'button',
};
