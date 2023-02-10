import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import Button from './Button';
import './css/Question.css';

export default class QuestionCard extends Component {
  state = {
    isAnswerSelected: false,
  };

  handleClick = () => {
    this.setState({ isAnswerSelected: true });
  };

  shuffle = (array) => {
    const magicNumber = 0.5;
    return array.sort(() => Math.random() - magicNumber);
  };

  shuffleAnswers = (isAnswerSelected) => {
    const { question } = this.props;

    const correctAnswer = (
      <Button
        testId="correct-answer"
        key={ question.correct_answer }
        text={ question.correct_answer }
        handleClick={ this.handleClick }
        customClass={ isAnswerSelected ? 'correct_answer' : '' }
      />
    );

    const incorrectAnswers = question.incorrect_answers.map((answer, index) => (
      <Button
        testId={ `wrong-answer-${index}` }
        key={ answer }
        text={ answer }
        handleClick={ this.handleClick }
        customClass={ isAnswerSelected ? 'wrong_answer' : '' }
      />
    ));

    const answers = [correctAnswer, ...incorrectAnswers];

    return this.shuffle(answers);
  };

  render() {
    const { question } = this.props;
    const { isAnswerSelected } = this.state;
    const shuffledAnswers = this.shuffleAnswers(isAnswerSelected);

    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h3 data-testid="question-text">{decode(question.question)}</h3>

        <div data-testid="answer-options">
          {shuffledAnswers.map((answer) => answer)}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;
