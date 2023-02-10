import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import Button from './Button';
import './css/Button.css';

export default class QuestionCard extends Component {
  state = {
    shuffledAnswers: [],
    isAnswerSelected: false,
  };

  componentDidMount() {
    this.shuffleAnswers();
  }

  handleClick = () => {
    this.setState({ isAnswerSelected: true });
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

  render() {
    const { question } = this.props;
    const { shuffledAnswers, isAnswerSelected } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h3 data-testid="question-text">{decode(question.question)}</h3>

        <div data-testid="answer-options">
          {shuffledAnswers.map((answer) => (
            <Button
              testId={
                answer.value ? 'correct-answer' : `wrong-answer-${answer.index}`
              }
              key={ answer.name }
              text={ answer.name }
              handleClick={ this.handleClick }
              customClass={ isAnswerSelected ? answer.class : undefined }
            />
          ))}
        </div>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.shape({}),
}.isRequired;
