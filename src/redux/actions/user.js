export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});
