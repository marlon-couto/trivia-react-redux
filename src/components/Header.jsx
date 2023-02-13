import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import configIcon from '../images/config.png';
import starIcon from '../images/iconStar.png';
import './css/Header.css';
import './css/Button.css';

class Header extends Component {
  render() {
    const {
      history: { push },
      player,
    } = this.props;

    return (
      <header>
        <nav>
          <div className="headerUser">
            <img
              data-testid="header-profile-picture"
              src={ player.image }
              alt="Foto de usuário"
            />
            <p data-testid="header-player-name">{player.name}</p>
          </div>
          <div className="headerScore">
            <img
              data-testid="header-profile-picture"
              src={ starIcon }
              alt="Ícone de estrela"
              width="25px" // TODO: colocar em css
            />
            <p data-testid="header-score">
              Pontos:
              <strong>
                {` ${player.score}`}
              </strong>
            </p>
          </div>
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
