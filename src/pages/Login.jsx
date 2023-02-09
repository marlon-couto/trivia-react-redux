import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail, validateName } from '../helpers/validate';
import { loginRequest } from '../redux/actions/user';
import configIcon from '../images/config.png';

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
    dispatch(loginRequest(name, email));
    push('/game');
  };

  render() {
    const { email, name, isDisabled } = this.state;
    const { history: { push } } = this.props;
    return (
      <div className="login">
        <Input
          label="Nome"
          handleChange={ this.handleChange }
          name="name"
          type="name"
          value={ name }
          testId="input-player-name"
        />

        <Input
          label="E-mail"
          handleChange={ this.handleChange }
          name="email"
          type="email"
          value={ email }
          testId="input-gravatar-email"
        />

        <Button
          disabled={ isDisabled }
          handleClick={ this.handleClick }
          testId="btn-play"
          text="Play"
        />

        <Button
          handleClick={ () => push('/settings') }
          image={ configIcon }
          testId="btn-settings"
        />
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
