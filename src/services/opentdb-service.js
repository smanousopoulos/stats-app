import fetch from '../utils/fetch';
import courses from '../data/courses';

const host = 'https://opentdb.com/api.php'; // TODO: extract to config

const fetchQuestions = (category, amount, difficulty) => {
  const params = {
    url: `${host}?amount=${amount}&category=${category}&difficulty=${difficulty}`,
    method: 'get',
  };

  return fetch(params);
};

export {
  fetchQuestions,
};