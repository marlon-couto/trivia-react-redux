const mockData = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question:
        'In most FPS video games such as Counter-Strike, shooting which part of the body does the highest damage?',
      correct_answer: 'Head',
      incorrect_answers: ['Arm', 'Leg', 'Chest'],
    },
    {
      category: 'Entertainment: Music',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'What is the name of the main character from the music video of &quot;Shelter&quot; by Porter Robinson and A-1 Studios?',
      correct_answer: 'Rin',
      incorrect_answers: ['Rem', 'Ren', 'Ram'],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Sean Bean voices the character of &quot;Martin Septim&quot; in which Elder Scrolls game?',
      correct_answer: 'The Elder Scrolls IV: Oblivion',
      incorrect_answers: [
        'The Elder Scrolls V: Skyrim',
        'The Elder Scrolls III: Morrowind ',
        'The Elder Scrolls Online',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What animal is featured in &quot;Bloons TD Battles&quot;?',
      correct_answer: 'Monkeys',
      incorrect_answers: ['Alligators', 'Pigeons', 'Lizards'],
    },
    {
      category: 'Entertainment: Books',
      type: 'boolean',
      difficulty: 'easy',
      question:
        'Shub-Niggurath is a creature that was created by \tJ. R. R. Tolkien in his novel &quot;The Lord of The Rings&quot;.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
    },
  ],
};

export default mockData;
