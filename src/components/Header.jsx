import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import configIcon from '../images/config.png';

class Header extends Component {
  render() {
    const {
      history: { push },
      player,
    } = this.props;

    return (
      <header>
        <nav>
          <img
            data-testid="header-profile-picture"
            src={ player.image }
            alt="Foto de usuário"
            width="50px" // TODO: colocar em css
          />
          <p data-testid="header-player-name">{player.name}</p>
          <p data-testid="header-score">{player.score}</p>
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
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(Header);
