// Valida email e senha
export const validateEmail = (value) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(value);
};

export const validateName = (value) => {
  const minimumLength = 2;
  return value.length >= minimumLength;
};
