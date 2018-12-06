import fetch from '../utils/fetch';
import { opentdb as host } from '../../hosts';

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