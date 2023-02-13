import createHash from '../../helpers/createHash';
import fetchApi from '../../helpers/fetchApi';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SAVE_SCORE = 'SAVE_SCORE';

export const loginSuccess = (name, gravatarEmail, image) => ({
  type: LOGIN_SUCCESS,
  payload: {
    name,
    gravatarEmail,
    image,
  },
});

export const loginRequest = (name, gravatarEmail, push) => {
  const image = `https://www.gravatar.com/avatar/${createHash(gravatarEmail)}`;
  return async (dispatch) => {
    const response = await fetchApi(
      'https://opentdb.com/api_token.php?command=request',
    );
    localStorage.setItem('token', response.token ?? '');
    push('/game');
    dispatch(loginSuccess(name, gravatarEmail, image));
  };
};

export const saveScore = (score, assertions) => ({
  type: SAVE_SCORE,
  payload: {
    score,
    assertions,
  },
});
