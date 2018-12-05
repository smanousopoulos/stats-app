import uuidv4 from 'uuid/v4';
import * as actions from './actions';
import * as openTdbService from '../../../services/opentdb-service';
import { commonActions } from '../common';
import * as statsService from '../../../services/stats-service';

const transformQuestions = (questions) => {
  return questions.map((question) => ({
    ...question,
    id: uuidv4(),
    answers: [...question.incorrect_answers, question.correct_answer],
  }));
};

const fetchQuestions = (category) => (dispatch, getState) => {
  const { session } = getState();
  const { questionsNumber, difficulty } = session;

  dispatch(commonActions.startRequest());

  return openTdbService.fetchQuestions(category, questionsNumber, difficulty)
    .then((response) => {
      const rawQuestions = response && response.results || [];
      const questions = transformQuestions(rawQuestions);

      dispatch(commonActions.endRequest());
      dispatch(actions.setQuestions(questions));
    })
    .catch((error) => { // eslint-disable-line no-unused-vars
      // TODO: handle error
      console.error(error);
      dispatch(commonActions.endRequest());
    });
};

const sendAnswers = (categoryId) => (dispatch, getState) => {
  const { user, session, course } = getState();
  const { questions } = session;
  const { courses } = course;
  const { userId } = user;
  const totalScore = questions.reduce((acc, question) => {
    return question.selected === question.correct_answer ? acc + 1 : acc;
  }, 0);
  const totalModulesStudied = session.questions.reduce((acc, question) => {
    return question.selected ? acc + 1 : acc;
  }, 0);
  const averageScore = totalScore / totalModulesStudied;
  const sessionStats = {
    sessionId: uuidv4(),
    totalModulesStudied,
    averageScore: averageScore,
    timeStudied: 1000, // TODO: calculate time elapsed
  };

  dispatch(commonActions.startRequest());

  const matchingCourse = courses.find(course => course.id === categoryId);
  const courseId = matchingCourse && matchingCourse.courseId;
  return statsService.updateSession(userId, courseId, sessionStats)
    .then(() => {
      dispatch(commonActions.endRequest());
    })
    .catch((error) => { // eslint-disable-line no-unused-vars
      // TODO: handle error
      console.error(error);
      dispatch(commonActions.endRequest());
    });
};

export {
  fetchQuestions,
  sendAnswers,
};
