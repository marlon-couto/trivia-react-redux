import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const niceGrade = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    return (
      <main>
        <Header history={ history } />
        <div>
          <section>
            <h1 data-testid="feedback-text">
              Feedback
            </h1>
            <p data-testid="feedback-total-question">
              {assertions}
            </p>
            <p data-testid="feedback-total-score">
              {score}
            </p>
            <p
              data-testid="feedback-text"
            >
              {
                assertions >= niceGrade ? 'Well Done!' : 'Could be better...'
              }
            </p>
            <section>
              <button
                type="button"
                onClick={ () => history.push('/ranking') }
                data-testid="btn-ranking"
              >
                Ranking
              </button>
              <button
                type="button"
                onClick={ () => history.push('/') }
                data-testid="btn-play-again"
              >
                Play Again
              </button>
            </section>
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
