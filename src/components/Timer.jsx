import PropTypes from 'prop-types';
import React, { Component } from 'react';
import timerIcon from '../images/iconTimer.png';

export default class Timer extends Component {
  state = {
    seconds: 30,
    teste: false,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    const { setTimedOut } = this.props;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }), () => {
        const { seconds } = this.state;
        setTimedOut(seconds);
      });
    }, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clearTimer = () => {
    const { isTimedOut } = this.props;
    const { seconds, teste } = this.state;

    if ((isTimedOut || seconds === 0) && !teste) {
      clearInterval(this.interval);
    }
  };

  render() {
    const { seconds } = this.state;

    this.clearTimer();

    return (
      <h3 className="questionTimer">
        <img src={ timerIcon } alt="" />
        {`Tempo: ${seconds}s`}
      </h3>
    );
  }
}

Timer.propTypes = {
  isTimedOut: PropTypes.bool,
  setTimedOut: PropTypes.func,
}.isRequired;
