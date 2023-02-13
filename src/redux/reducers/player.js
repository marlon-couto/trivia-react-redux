import logo from '../../images/anonymous.jpeg';
import { LOGIN_SUCCESS, SAVE_SCORE } from '../actions/player';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  image: logo,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case LOGIN_SUCCESS: {
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
      image: payload.image,
    };
  }

  case SAVE_SCORE: {
    return {
      ...state,
      score: Number(payload.score) + Number(state.score),
      assertions: payload.assertions,
    };
  }

  default: {
    return state;
  }
  }
};

export default player;
