import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import configIcon from '../images/config.png';

class Header extends Component {
  render() {
    const {
      history: { push },
      user,
    } = this.props;
    const score = JSON.parse(localStorage.getItem('player') ?? '{}').score ?? 0;
    return (
      <header>
        <nav>
          <img
            data-testid="header-profile-picture"
            src={ user.image }
            alt="Foto de usuário"
            width="50px" // TODO: colocar em css
          />
          <p data-testid="header-player-name">{user.name}</p>
          <p data-testid="header-score">{score}</p>
          <Button
            handleClick={ () => push('/settings') }
            image={ configIcon }
            testId="btn-settings"
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Header);
