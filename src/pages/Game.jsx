import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import fetchApi from '../helpers/fetchApi';

const URL = 'https://opentdb.com/api.php?';

class Game extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.handleResponse();
    }, 2000);
  }

  handleResponse = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const ERROR_CODE = 3;

    const data = await fetchApi(`${URL}amount=5&token=${token}`);

    if (data.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions: data.results });
  };

  render() {
    const { history } = this.props;
    const { questions } = this.state;

    return (
      <div>
        <Header history={ history } />
        {questions.length && <Question question={ questions[0] } />}
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
