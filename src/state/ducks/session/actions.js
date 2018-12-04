import * as types from './types';

const setQuestionsNumber = (questionsNumber) => ({
  type: types.SET_QUESTIONS_NUMBER,
  payload: {},
});

const setDifficultyLevel = (difficulty) => ({
  type: types.SET_DIFFICULTY,
  payload: {},
});

const setQuestions = (questions) => ({
  type: types.SET_QUESTIONS,
  payload: {},
});

const updateQuestion = (id, answerIndex) => ({
  type: types.UPDATE_QUESTION,
  payload: {},
});

const setTimeElapsed = (time) => ({
  type: types.SET_TIME_ELAPSED,
  payload: {},
});

const setAverageScore = (score) => ({
  type: types.SET_AVERAGE_SCORE,
  payload: {},
});

const resetSession = () => ({
  type: types.RESET_SESSION,
  payload: {},
});

export {
  setQuestionsNumber,
  setDifficultyLevel,
  setQuestions,
  updateQuestion,
  setTimeElapsed,
  setAverageScore,
  resetSession,
};
