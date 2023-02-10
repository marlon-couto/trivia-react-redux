import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'he';
import Button from './Button';
import Timer from './Timer';
import calculatePoints from '../helpers/calculatePoints';
import { saveScore } from '../redux/actions/player';
import './css/Button.css';
import './css/Question.css';

class QuestionCard extends Component {
  state = {
    shuffledAnswers: [],
    isAnswerSelected: false,
    isTimedOut: false,
    score: 0,
    secondsRemaining: 30,
    assertions: 0,
  };

  componentDidMount() {
    this.shuffleAnswers();
  }

  handleClick = (value) => {
    const { question, dispatch } = this.props;

    this.setState(
      (prevState) => ({
        isAnswerSelected: true,
        isTimedOut: true,
        score: value
          ? prevState.score
            + calculatePoints(question, prevState.secondsRemaining)
          : score,
        assertions: value ? prevState.assertions + 1 : prevState.assertions,
      }),
      () => {
        const { score, assertions } = this.state;
        dispatch(saveScore(score, assertions));
      },
    );
  };

  shuffle = (array) => {
    const magicNumber = 0.5;
    return array.sort(() => Math.random() - magicNumber);
  };

  shuffleAnswers = () => {
    const { question } = this.props;

    const correctAnswer = {
      name: question.correct_answer,
      value: true,
      class: 'correctAnswer',
    };

    const incorrectAnswers = question.incorrect_answers.map(
      (answer, index) => ({
        name: answer,
        index,
        value: false,
        class: 'wrongAnswer',
      }),
    );

    const answers = [correctAnswer, ...incorrectAnswers];

    this.setState({ shuffledAnswers: this.shuffle(answers) });
  };

  setTimedOut = (seconds) => {
    if (seconds === 0) {
      this.setState({ isTimedOut: true });
    }

    this.setState({ secondsRemaining: seconds });
  };

  render() {
    const { question } = this.props;
    const { shuffledAnswers, isAnswerSelected, isTimedOut } = this.state;

    return (
      <div className="question">
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
              customClass={ isAnswerSelected ? answer.class : undefined }
              disabled={ isTimedOut || isAnswerSelected }
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

export default connect(mapStateToProps)(QuestionCard);

QuestionCard.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;
