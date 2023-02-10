import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  render() {
    // const { loginSuccess } = this.props;
    // const hash = md5(email).toString();
    // const ranking = JSON.parse(localStorage.getItem('ranking') && '[]');
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {/* <div>
          {
            ranking?.map((player, index) => (
              <>
                <span key={ player.name } />
                <img src={ `https://www.gravatar.com/avatar/${hash}` } alt={ player.name } />
                <span data-testid={ `player-name-${index}` }>
                  Nome:
                  {player.name}
                </span>
                <span data-testid={ `player-score-${index}` }>
                  Pontuação:
                  {player.score}
                </span>
              </>
            ))
          }
        </div> */}
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
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

// mapStateToProps = () => ({
// });
export default connect()(Ranking);
