import * as types from './types';

const initialState = {
  questionsNumber: 10,
  difficulty: 'easy',
  questions: [],
  score: 0,
  timeStarted: null,
};

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_QUESTIONS_NUMBER:
      return {
        ...state,
        questionsNumber: Number.parseInt(action.payload.questionsNumber),
      };

    case types.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload.difficulty,
      };

    case types.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
      };

    case types.UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map(question => question.id === action.payload.id ? ({
          ...question,
          selected: action.payload.answer,
        }) : question),
      };

    case types.START_SESSION_TIMER:
      return {
        ...state,
        timeStarted: new Date().getTime()
      };


    case types.RESET_SESSION:
      return initialState;


    default:
      return state;
  }
};

export default sessionReducer;
