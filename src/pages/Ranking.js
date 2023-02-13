import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking') ?? '[]');
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {
            playerRanking.map((player, index) => (
              <li key={ player.name }>
                <img src={ player.image } alt={ player.name } />
                <span data-testid={ `player-name-${index}` }>
                  Jogador:
                  { player.name }
                </span>
                <span data-testid={ `player-score-${index}` }>
                  Pontuação:
                  { player.score }
                </span>
              </li>

            ))
          }
        </ol>

        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Play Again
          </button>
        </Link>
      </div>
    );
  }
}
// teste

// Ranking.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

export default connect()(Ranking);
