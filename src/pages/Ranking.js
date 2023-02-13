import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/Button';
import triviaIcon from '../images/logo.png';
import './css/Ranking.css';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const playerRanking = JSON.parse(localStorage.getItem('ranking') ?? '[]');
    return (
      <div className="ranking">
        <div className="rankingForm">

          <img src={ triviaIcon } alt="Ícon do Trívia" />

          <h1 data-testid="ranking-title" className="rankingTitle">Ranking</h1>

          <ol>
            {
              playerRanking
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
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

          <Button
            data-testid="btn-go-home"
            text="Play Again"
            type="button"
            handleClick={ () => { history.push('/'); } }
            customClass="rankingPlayButton"
          />

        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
