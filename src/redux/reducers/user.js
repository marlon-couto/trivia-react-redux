import logo from '../../images/logo.png';

const INITIAL_STATE = {
  username: '',
  email: '',
  image: logo,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default user;
