import createHash from '../../helpers/createHash';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const loginRequest = (name, email) => {
  const image = `https://www.gravatar.com/avatar/${createHash(email)}`;
  return {
    type: LOGIN_REQUEST,
    payload: {
      name,
      email,
      image,
    },
  };
};
