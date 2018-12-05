import * as types from './types';

const setQuestionsNumber = (questionsNumber) => ({
  type: types.SET_QUESTIONS_NUMBER,
  payload: {
    questionsNumber,
  },
});

const setDifficultyLevel = (difficulty) => ({
  type: types.SET_DIFFICULTY,
  payload: {
    difficulty,
  },
});

const setQuestions = (questions) => ({
  type: types.SET_QUESTIONS,
  payload: {
    questions,
  },
});

const updateQuestion = (id, answer) => ({
  type: types.UPDATE_QUESTION,
  payload: {
    id,
    answer,
  },
});

const setTimeElapsed = (time) => ({
  type: types.SET_TIME_ELAPSED,
  payload: {
    time,
  },
});

const setAverageScore = (score) => ({
  type: types.SET_AVERAGE_SCORE,
  payload: {
    score,
  },
});

const resetSession = () => ({
  type: types.RESET_SESSION,
});

const startSessionTimer = () => ({
  type: types.START_SESSION_TIMER,
});

export {
  setQuestionsNumber,
  setDifficultyLevel,
  setQuestions,
  updateQuestion,
  setTimeElapsed,
  setAverageScore,
  resetSession,
  startSessionTimer,
};
