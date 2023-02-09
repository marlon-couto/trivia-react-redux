import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Game
        <Header history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Game;
