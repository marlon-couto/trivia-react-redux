import logo from '../../images/logo.png';
import { LOGIN_SUCCESS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: logo,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      image: action.payload.image,
    };
  default:
    return state;
  }
};

export default user;
