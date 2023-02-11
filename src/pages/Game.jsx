import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import fetchApi from '../helpers/fetchApi';
import './css/Game.css';

const URL = 'https://opentdb.com/api.php?';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    shuffledAnswers: [],
  };

  componentDidMount() {
    this.handleResponse();
  }

  shuffle = (array) => {
    const magicNumber = 0.5;
    return array.sort(() => Math.random() - magicNumber);
  };

  shuffleAnswers = (question) => {
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

  handleResponse = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const ERROR_CODE = 3;

    const data = await fetchApi(`${URL}amount=5&token=${token}`);

    if (data.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions: data.results }, () => {
      const { questions, currentQuestion } = this.state;
      this.shuffleAnswers(questions[currentQuestion]);
    });
  };

  handleNext = () => {
    const { questions, currentQuestion: curr } = this.state;
    const maxQuestions = 4;
    if (curr < maxQuestions) {
      this.setState(({ currentQuestion }) => ({
        currentQuestion: currentQuestion < maxQuestions ? (
          currentQuestion + 1) : maxQuestions,
      }), () => {
        const { currentQuestion } = this.state;
        this.shuffleAnswers(questions[currentQuestion]);
      });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  render() {
    const { history } = this.props;
    const { questions, currentQuestion, shuffledAnswers } = this.state;

    return (
      <div className="game">
        <Header history={ history } />

        {questions.length && (
          <Question
            key={ currentQuestion }
            // /\ Coloquei uma key pra remover todo o componente e renderizar novamente
            // /\ quando o usuário clicar em "Next", e assim reconstruir o timer e os
            // /\ demais componentes (buttons, etc...)
            question={ questions[currentQuestion] }
            handleNext={ this.handleNext }
            shuffledAnswers={ shuffledAnswers }
          />
        )}

        <footer />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
