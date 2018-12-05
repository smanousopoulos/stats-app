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

const fetchQuestions = (courseId) => (dispatch, getState) => {
  const { session, course } = getState();
  const { questionsNumber, difficulty } = session;
  const { courses } = course;

  const matchingCourse = courses.find(course => course.courseId === courseId);
  const categoryId = matchingCourse && matchingCourse.id;

  dispatch(commonActions.startRequest());

  return openTdbService.fetchQuestions(categoryId, questionsNumber, difficulty)
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

const sendAnswers = (courseId) => (dispatch, getState) => {
  const { user, session } = getState();
  const { questions, timeStarted } = session;
  const { userId } = user;

  const totalScore = questions.reduce((acc, question) => {
    return question.selected === question.correct_answer ? acc + 1 : acc;
  }, 0);
  const totalModulesStudied = session.questions.reduce((acc, question) => {
    return question.selected ? acc + 1 : acc;
  }, 0);
  const averageScore = totalScore / totalModulesStudied;
  const now = new Date().getTime();
  const sessionStats = {
    sessionId: uuidv4(),
    totalModulesStudied,
    averageScore: averageScore,
    timeStudied: now - timeStarted,
  };

  dispatch(commonActions.startRequest());

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
