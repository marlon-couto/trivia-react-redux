import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validateName } from '../helpers/validate';
import { loginRequest } from '../redux/actions/player';
import configIcon from '../images/config.png';
import triviaIcon from '../images/logo.png';
import trybeIcon from '../images/iconTrybe.png';
import './css/Login.css';

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

  handleClick = () => {
    const { email, name } = this.state;
    const { history: { push }, dispatch } = this.props;
    dispatch(loginRequest(name, email, push));
  };

  render() {
    const { email, name, isDisabled } = this.state;
    const { history: { push } } = this.props;
    return (
      <div className="login">

        <img src={ triviaIcon } alt="Ícone do Trívia" className="triviaIcon" />

        <form className="formLogin">

          <Button
            customClass="buttonConfig"
            handleClick={ () => push('/settings') }
            image={ configIcon }
            testId="btn-settings"
          />

          <Input
            placeholder="Qual é o seu nome?"
            handleChange={ this.handleChange }
            name="name"
            type="name"
            value={ name }
            testId="input-player-name"
          />

          <Input
            placeholder="Qual é o seu e-mail do gravatar?"
            handleChange={ this.handleChange }
            name="email"
            type="email"
            value={ email }
            testId="input-gravatar-email"
          />

          <Button
            customClass="buttonLogin"
            disabled={ isDisabled }
            handleClick={ this.handleClick }
            testId="btn-play"
            text="Play"
          />

        </form>

        <img src={ trybeIcon } alt="Ícone da Trybe" />

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
