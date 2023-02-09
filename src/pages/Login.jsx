import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { handleChangeForm } from '../helpers/handleForm';
import { validateEmail, validateName } from '../helpers/validate';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    this.setState(
      { [target.name]: target.value },
      () => {
        const { email, name } = this.state;
        this.setState({
          isDisabled: !validateEmail(email) || !validateName(name),
        });
      },
    );
  };

  render() {
    const { email, name, isDisabled } = this.state;

    return (
      <div className="login">
        <input
          type="text"
          data-testid="input-player-name"
          id="name"
          value={ name }
          placeholder="Nome"
          onChange={ this.handleChange }
          name="name"
        />

        <input
          type="email"
          data-testid="input-gravatar-email"
          id="email"
          value={ email }
          placeholder="E-mail"
          onChange={ this.handleChange }
          name="email"
        />

        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisabled }
          onClick={ () => {} }
        >
          Play
        </button>
      </div>
    );
  }
}

export default connect()(Login);
