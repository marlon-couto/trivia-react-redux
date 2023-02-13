import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import triviaIcon from '../images/logo.png';
import './css/Ranking.css';

class Ranking extends Component {
  state = {
    playerRanking: [],
  };

  componentDidMount() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking') ?? '[]');
    playerRanking.sort((a, b) => b.score - a.score);
    this.setState({ playerRanking });
  }

  render() {
    const { history } = this.props;
    const { playerRanking } = this.state;
    return (
      <div className="ranking">
        <div className="rankingForm">

          <img src={ triviaIcon } alt="Ícon do Trívia" />

          <h1 data-testid="ranking-title" className="rankingTitle">Ranking</h1>

          <ol>
            {
              playerRanking
                .map((player, index) => (
                  <li key={ `${player.name}-${player.score}` }>
                    <img src={ player.image } alt={ player.name } />
                    Jogador:
                    <span data-testid={ `player-name-${index}` }>
                      { player.name }
                    </span>
                    Pontuação:
                    <span data-testid={ `player-score-${index}` }>
                      { player.score }
                    </span>
                  </li>

                ))
            }
          </ol>

          <Button
            testId="btn-go-home"
            text="Play Again"
            type="button"
            handleClick={ () => history.push('/') }
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
