import * as actions from './actions';
import * as openTdbService from '../../../services/opentdb-service';

const fetchQuestions = (category) => (dispatch, getState) => {
  const { session } = getState();
  const { questionsNumber, difficulty } = session;

  // TODO: dispatch loading
  return openTdbService.fetchQuestions(category, questionsNumber, difficulty)
    .then((response) => {
      const questions = response && response.results || [];
      dispatch(actions.setQuestions(questions));
    })
    .catch((error) => {
     // TODO: dispatch error
    });
};

export {
  fetchQuestions,
};
