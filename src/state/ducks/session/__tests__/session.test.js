import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as operations from '../operations';
import * as types from '../types';
import reducer from '../reducers';

const dummyQuestions = [
  {
    id: 'id-1',
    question: 'True === false?',
    answers: ['true', 'false'],
    correct: 0,
    selected: 0,
  },
  {
    id: 'id-2',
    question: 'What\'s after a?',
    answers: ['a', 'b', 'c', 'd'],
    correct: 3,
    selected: 2
  },
  {
    id: 'id-3',
    question: 'What is the first mammal?',
    answers: ['man', 'pigeon', 'mouse', 'whale'],
    correct: 2,
  },
];

describe('Session actions', () => {
  describe('Set questions number', () => {
    const questionsNumber = 2;
    const expectedAction = {
      type: types.SET_QUESTIONS_NUMBER,
      payload: {
        questionsNumber,
      }
    };

    it('should create an action to set the questions number', () => {
      expect(actions.setQuestionsNumber(questionsNumber)).toEqual(expectedAction);
    });
  });

  describe('Set difficulty level', () => {
    const difficulty = 'hard';
    const expectedAction = {
      type: types.SET_DIFFICULTY,
      payload: {
        difficulty,
      }
    };

    it('should create an action to set the difficulty', () => {
      expect(actions.setDifficultyLevel(difficulty)).toEqual(expectedAction);
    });
  });

  describe('Set questions', () => {
    const expectedAction = {
      type: types.SET_QUESTIONS,
      payload: {
        questions: dummyQuestions,
      }
    };

    it('should create an action to set the questions', () => {
      expect(actions.setQuestions(dummyQuestions)).toEqual(expectedAction);
    });
  });

  describe('Update question', () => {
    const id = '1';
    const answerIndex = 4;

    const expectedAction = {
      type: types.UPDATE_QUESTION,
      payload: {
        id,
        answerIndex,
      }
    };

    it('should create an action to set the questions', () => {
      expect(actions.updateQuestion(id, answerIndex)).toEqual(expectedAction);
    });
  });

  describe('Set time elapsed', () => {
    const time = 5000;
    const expectedAction = {
      type: types.SET_TIME_ELAPSED,
      payload: {
        time,
      }
    };

    it('should create an action to set the questions', () => {
      expect(actions.setTimeElapsed(time)).toEqual(expectedAction);
    });
  });

  describe('Set average score', () => {
    const score = 5.2;
    const expectedAction = {
      type: types.SET_AVERAGE_SCORE,
      payload: {
        score,
      }
    };

    it('should create an action to set the questions', () => {
      expect(actions.setAverageScore(score)).toEqual(expectedAction);
    });
  });

  describe('Reset session', () => {
    const expectedAction = {
      type: types.RESET_SESSION,
    };

    it('should create an action to reset the session', () => {
      expect(actions.resetSession()).toEqual(expectedAction);
    });
  });
});

describe('Session reducer', () => {
  const initialState = {
    questionsNumber: 0,
    difficulty: 'easy',
    questions: [],
    score: 0,
    timeElapsed: 0,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('when handling SET_QUESTIONS_NUMBER', () => {
    const seQuestionsNumberAction = {
      type: types.SET_QUESTIONS_NUMBER,
      payload: {
        questionsNumber: 5,
      }
    };

    const initialState = {
      difficulty: 'easy',
      questionsNumber: 0,
    };

    it('should update questions number', () => {
      expect(reducer(initialState, seQuestionsNumberAction)).toEqual({
        difficulty: 'easy',
        questionsNumber: 5,
      });
    });
  });

  describe('when handling SET_DIFFICULTY', () => {
    const setDifficultyAction = {
      type: types.SET_DIFFICULTY,
      payload: {
        difficulty: 'easy',
      }
    };

    const initialState = {
      questionsNumber: 0,
      difficulty: 'any',
    };

    it('should update difficulty', () => {
      expect(reducer(initialState, setDifficultyAction)).toEqual({
        questionsNumber: 0,
        difficulty: 'easy',
      });
    });
  });

  describe('when handling SET_QUESTIONS', () => {
    const setQuestionsAction = {
      type: types.SET_QUESTIONS,
      payload: {
        questions: dummyQuestions
      }
    };

    const initialState = {
      questionsNumber: 0,
      difficulty: 'any',
      questions: []
    };

    it('should update questions', () => {
      expect(reducer(initialState, setQuestionsAction)).toEqual({
        questionsNumber: 0,
        difficulty: 'any',
        questions: dummyQuestions
      });
    });
  });

  describe('when handling UPDATE_QUESTION', () => {
    const initialState = {
      questions: dummyQuestions
    };

    describe('and question id is not found', () => {
      const id = 'id-55';
      const answerIndex = 3;

      const updateQuestionAction = {
        type: types.UPDATE_QUESTION,
        payload: {
          id,
          answerIndex,
        }
      };

      it('should leave state as is', () => {
        expect(reducer(initialState, updateQuestionAction)).toEqual({
          questions: dummyQuestions
        });
      });
    });

    describe('and question has current selected value', () => {
      const id = 'id-2';
      const answerIndex = 3;

      const updateQuestionAction = {
        type: types.UPDATE_QUESTION,
        payload: {
          id,
          answerIndex,
        }
      };

      it('should update question\'s selected value', () => {
        const newState = reducer(initialState, updateQuestionAction);
        expect(newState.questions.length).toEqual(3);
        expect(newState.questions[0]).toEqual(dummyQuestions[0]);
        expect(newState.questions[2]).toEqual(dummyQuestions[2]);

        const { selected, id, question, answers, correct } = newState.questions[1];
        expect(selected).toEqual(3);
        expect(id).toEqual(dummyQuestions[1].id);
        expect(question).toEqual(dummyQuestions[1].question);
        expect(answers).toEqual(dummyQuestions[1].answers);
        expect(correct).toEqual(dummyQuestions[1].correct);
      });
    });

    describe('and question has selected value', () => {
      const id = 'id-3';
      const answerIndex = 1;

      const updateQuestionAction = {
        type: types.UPDATE_QUESTION,
        payload: {
          id,
          answerIndex,
        }
      };

      it('should update question\'s selected value', () => {
        const newState = reducer(initialState, updateQuestionAction);
        expect(newState.questions.length).toEqual(3);
        expect(newState.questions[0]).toEqual(dummyQuestions[0]);
        expect(newState.questions[1]).toEqual(dummyQuestions[1]);

        const { selected, id, question, answers, correct } = newState.questions[2];
        expect(selected).toEqual(1);
        expect(id).toEqual(dummyQuestions[2].id);
        expect(question).toEqual(dummyQuestions[2].question);
        expect(answers).toEqual(dummyQuestions[2].answers);
        expect(correct).toEqual(dummyQuestions[2].correct);
      });
    });
  });

  describe('when handling SET_TIME_ELAPSED', () => {
    const time = 5000;
    const setTimeElapsedAction = {
      type: types.SET_TIME_ELAPSED,
      payload: {
        time,
      }
    };

    const initialState = {
      questionsNumber: 0,
      difficulty: 'any',
      timeElapsed: 10,
    };

    it('should update elapsed time', () => {
      expect(reducer(initialState, setTimeElapsedAction)).toEqual({
        questionsNumber: 0,
        difficulty: 'any',
        timeElapsed: 5000,
      });
    });
  });

  describe('when handling SET_AVERAGE_SCORE', () => {
    const score = 4.5;
    const setAverageScoreAction = {
      type: types.SET_AVERAGE_SCORE,
      payload: {
        score,
      }
    };

    const initialState = {
      questionsNumber: 0,
      difficulty: 'any',
    };

    it('should update elapsed time', () => {
      expect(reducer(initialState, setAverageScoreAction)).toEqual({
        questionsNumber: 0,
        difficulty: 'any',
        score,
      });
    });
  });

  describe('when handling RESET_SESSION', () => {
    const resetSessionAction = {
      type: types.RESET_SESSION,
    };

    const initialState = {
      questionsNumber: 0,
      difficulty: 'any',
      timeElapsed: 55,
    };

    it('should reset the session', () => {
      expect(reducer(initialState, resetSessionAction)).toEqual(initialState);
    });
  });
});

