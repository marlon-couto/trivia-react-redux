import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'he';
import Button from './Button';
import Timer from './Timer';
import calculatePoints from '../helpers/calculatePoints';
import { saveScore } from '../redux/actions/player';
import triviaIcon from '../images/logo.png';
import trybeIcon from '../images/iconTrybe.png';
import './css/Button.css';
import './css/Question.css';

class Question extends Component {
  state = {
    isAnswerSelected: false,
    isTimedOut: false,
    score: 0,
    secondsRemaining: 30,
    assertions: 0,
  };

  handleClick = (value) => {
    const { question, dispatch } = this.props;

    this.setState(
      (prevState) => ({
        isAnswerSelected: true,
        isTimedOut: true,
        score: value
          ? prevState.score
            + calculatePoints(question, prevState.secondsRemaining)
          : prevState.score,
        assertions: value ? prevState.assertions + 1 : prevState.assertions,
      }),
      () => {
        const { score, assertions } = this.state;
        dispatch(saveScore(score, assertions));
      },
    );
  };

  setTimedOut = (seconds) => {
    if (seconds === 0) {
      this.setState({ isTimedOut: true });
    }

    this.setState({ secondsRemaining: seconds });
  };

  render() {
    const { question, handleNext, shuffledAnswers } = this.props;
    const { isAnswerSelected, isTimedOut } = this.state;
    const endCases = isAnswerSelected || isTimedOut;

    return (
      <>
        <div className="question">
          <img
            src={ triviaIcon }
            alt="Ícone do Trívia"
            className="triviaIcon"
          />
          <div className="questionBody">
            <div className="questionCategory">
              <h2 data-testid="question-category">{question.category}</h2>
            </div>
            <h3 data-testid="question-text">{decode(question.question)}</h3>
            {!isAnswerSelected && (
              <Timer
                isTimedOut={ isTimedOut }
                setTimedOut={ this.setTimedOut }
              />
            )}
          </div>
          <img
            src={ trybeIcon }
            alt="Ícone da Trybe"
            className="trybeIcon"
          />
        </div>
        <div className="secondary">
          <div
            data-testid="answer-options"
            className="questionAnswers"
          >
            {shuffledAnswers.map((answer) => (
              <Button
                testId={
                  answer.value ? 'correct-answer' : `wrong-answer-${answer.index}`
                }
                key={ answer.name }
                text={ decode(answer.name) }
                handleClick={ () => this.handleClick(answer.value) }
                customClass={ isAnswerSelected ? answer.class : 'option' }
                disabled={ endCases }
              />
            ))}
          </div>
          {endCases && (
            <Button
              testId="btn-next"
              handleClick={ handleNext }
              text="Next"
              customClass="buttonNext"
            />
          )}
        </div>
      </>
    );
  }
}

export default connect()(Question);

Question.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;
