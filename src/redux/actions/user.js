import createHash from '../../helpers/createHash';
import fetchApi from '../../helpers/fetchApi';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (name, email, image) => ({
  type: LOGIN_SUCCESS,
  payload: {
    name,
    email,
    image,
  },
});

export const loginRequest = (name, email, push) => {
  const image = `https://www.gravatar.com/avatar/${createHash(email)}`;
  return async (dispatch) => {
    const response = await fetchApi('https://opentdb.com/api_token.php?command=request');
    localStorage.setItem('token', response.token ?? '');
    push('/game');
    dispatch(loginSuccess(name, email, image));
  };
};
