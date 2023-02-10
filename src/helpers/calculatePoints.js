const calculatePoints = (question, secondsRemaining) => {
  const POINTS = 10;
  const hardMultiplier = 3;

  switch (question.difficulty) {
  case 'easy': {
    return POINTS + 1 * secondsRemaining;
  }

  case 'medium': {
    return POINTS + 2 * secondsRemaining;
  }

  case 'hard': {
    return POINTS + hardMultiplier * secondsRemaining;
  }

  default: {
    return 0;
  }
  }
};

export default calculatePoints;
