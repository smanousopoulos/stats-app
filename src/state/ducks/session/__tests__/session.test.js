import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockDate from 'mockdate';
import * as actions from '../actions';
import * as operations from '../operations';
import * as types from '../types';
import { commonTypes } from '../../common';
import reducer from '../reducers';
import * as openTdbService from '../../../../services/opentdb-service';
import statsService from '../../../../services/stats-service';
import { default as staticCourses } from '../../../../data/courses';

jest.mock('uuid/v4', () => () => 'is-a-uuid');
jest.mock('../../../../services/stats-service', () => ({
  updateSession: jest.fn(),
}));
jest.mock('../../../../services/opentdb-service', () => ({
  fetchQuestions: jest.fn(),
}));

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
    const answer = 4;

    const expectedAction = {
      type: types.UPDATE_QUESTION,
      payload: {
        id,
        answer,
      }
    };

    it('should create an action to set the questions', () => {
      expect(actions.updateQuestion(id, answer)).toEqual(expectedAction);
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

  describe('Start session timer', () => {
    const expectedAction = {
      type: types.START_SESSION_TIMER,
    };

    it('should create an action that initialises session start time', () => {
      expect(actions.startSessionTimer()).toEqual(expectedAction);
    });
  });
});

describe('Session reducer', () => {
  const initialState = {
    questionsNumber: 10,
    difficulty: 'easy',
    questions: [],
    score: 0,
    timeStarted: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('when handling SET_QUESTIONS_NUMBER', () => {
    const setQuestionsNumberAction = {
      type: types.SET_QUESTIONS_NUMBER,
      payload: {
        questionsNumber: '5',
      }
    };

    const initialState = {
      difficulty: 'easy',
      questionsNumber: 0,
    };

    it('should update questions number', () => {
      expect(reducer(initialState, setQuestionsNumberAction)).toEqual({
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
      const answer = 'answer-55';

      const updateQuestionAction = {
        type: types.UPDATE_QUESTION,
        payload: {
          id,
          answer,
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
      const answer = 'new-answer';

      const updateQuestionAction = {
        type: types.UPDATE_QUESTION,
        payload: {
          id,
          answer,
        }
      };

      it('should update question\'s selected value', () => {
        const newState = reducer(initialState, updateQuestionAction);
        expect(newState.questions.length).toEqual(3);
        expect(newState.questions[0]).toEqual(dummyQuestions[0]);
        expect(newState.questions[2]).toEqual(dummyQuestions[2]);

        const { selected, id, question, answers, correct } = newState.questions[1];
        expect(selected).toEqual(answer);
        expect(id).toEqual(dummyQuestions[1].id);
        expect(question).toEqual(dummyQuestions[1].question);
        expect(answers).toEqual(dummyQuestions[1].answers);
        expect(correct).toEqual(dummyQuestions[1].correct);
      });
    });

    describe('and question has selected value', () => {
      const id = 'id-3';
      const answer = 'new-answer';

      const updateQuestionAction = {
        type: types.UPDATE_QUESTION,
        payload: {
          id,
          answer,
        }
      };

      it('should update question\'s selected value', () => {
        const newState = reducer(initialState, updateQuestionAction);
        expect(newState.questions.length).toEqual(3);
        expect(newState.questions[0]).toEqual(dummyQuestions[0]);
        expect(newState.questions[1]).toEqual(dummyQuestions[1]);

        const { selected, id, question, answers, correct } = newState.questions[2];
        expect(selected).toEqual(answer);
        expect(id).toEqual(dummyQuestions[2].id);
        expect(question).toEqual(dummyQuestions[2].question);
        expect(answers).toEqual(dummyQuestions[2].answers);
        expect(correct).toEqual(dummyQuestions[2].correct);
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
    };

    it('should reset the session', () => {
      expect(reducer(initialState, resetSessionAction)).toEqual({
        questionsNumber: 10,
        difficulty: 'easy',
        questions: [],
        score: 0,
        timeStarted: null,
      });
    });
  });

  describe('when handling START_SESSION_TIMER', () => {
    const startSessionTimerAction = {
      type: types.START_SESSION_TIMER,
    };

    const initialState = {
      questionsNumber: 0,
      difficulty: 'any',
      timeStarted: null,
    };

    it('should set session time started to now', () => {
      const now = new Date().getTime();
      expect(reducer(initialState, startSessionTimerAction)).toEqual({
        ...initialState,
        timeStarted: now,
      });
    });
  });
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Session operations', () => {
  const results = [
    {
      category: 'General Knowledge',
      difficulty: 'easy',
      question: 'Who...',
      correct_answer: 'False',
      incorrect_answers: [
        'True'
      ]
    },
    {
      category: 'General Knowledge',
      difficulty: 'easy',
      question: 'Which...',
      correct_answer: 'Rock Band',
      incorrect_answers: [
        'Meat Beat Mania',
        'Guitar Hero Live',
        'Dance Dance Revolution'
      ]
    },
  ];

  const transformedResults = [
    {
      category: 'General Knowledge',
      difficulty: 'easy',
      question: 'Who...',
      correct_answer: 'False',
      incorrect_answers: [
        'True'
      ],
      answers: ['True', 'False'],
      id: 'is-a-uuid',
    },
    {
      category: 'General Knowledge',
      difficulty: 'easy',
      question: 'Which...',
      correct_answer: 'Rock Band',
      incorrect_answers: [
        'Meat Beat Mania',
        'Guitar Hero Live',
        'Dance Dance Revolution'
      ],
      answers: [
        'Meat Beat Mania',
        'Guitar Hero Live',
        'Dance Dance Revolution',
        'Rock Band',
      ],
      id: 'is-a-uuid',
    },
  ];

  describe('Fetch questions', () => {
    const courseId = staticCourses[0].courseId;

    describe('when opentdb service responds as expected', () => {

      beforeEach(() => {
        openTdbService.fetchQuestions.mockImplementation(() => Promise.resolve(({ results })));
      });
      const store = mockStore({
        session: {
          questionsNumber: 3,
          difficulty: 'hard',
          questions: [],
        },
        course: {
          courses: staticCourses
        },
      });

      beforeEach(() => {
        return store.dispatch(operations.fetchQuestions(courseId));
      });

      it('should dispatch START_REQUEST, END_REQUEST and SET_QUESTIONS action with fetched questions', () => {
        expect(store.getActions()).toEqual([
          {
            type: commonTypes.START_REQUEST,
          },
          {
            type: commonTypes.END_REQUEST,
          },
          {
            type: types.SET_QUESTIONS,
            payload: {
              questions: transformedResults
            }
          },
        ]);
      });
    });

    describe('when opentdb service doesn\'t respond as expected', () => {
      beforeEach(() => {
        openTdbService.fetchQuestions.mockImplementation(() => Promise.reject(({ message: 'Internal server error' })));
      });

      const store = mockStore({
        session: {
          questionsNumber: 3,
          difficulty: 'hard',
          questions: [],
        },
        course: {
          courses: staticCourses
        },
      });

      beforeEach(() => {
        return store.dispatch(operations.fetchQuestions(courseId));
      });

      it('should only dispatch START_REQUEST, END_REQUEST actions', () => {
        expect(store.getActions()).toEqual([
          {
            type: commonTypes.START_REQUEST,
          },
          {
            type: commonTypes.END_REQUEST,
          },
        ]);
      });
    });
  });

  describe('Send answers', () => {
    const courseId = staticCourses[0].courseId;
    const questions = [
      {
        question: 'Who...',
        correct_answer: 'False',
        selected: 'True',
        answers: [
          'True',
          'False'
        ]
      },
      {
        question: 'Which...',
        correct_answer: 'Rock Band',
        selected: 'Rock Band',
        answers: [
          'Meat Beat Mania',
          'Guitar Hero Live',
          'Dance Dance Revolution',
          'Rock Band',
        ]
      },
      {
        question: 'Where...',
        correct_answer: '1',
        answers: [
          '5',
          '18',
          '24',
          '1',
        ]
      },
    ];

    describe('when stats service POST to /courses/{courseId} responds as expected', () => {

      beforeAll(() => {
        statsService.updateSession.mockImplementation(() => Promise.resolve(results));
      });

      afterAll(() => {
        MockDate.reset();
      });

      MockDate.set('1987-01-01T00:00:00');

      const expectedSessionStats = {
        sessionId: 'is-a-uuid',
        totalModulesStudied: 2,
        averageScore: 1 / 2,
        timeStudied: 2000,
      };

      const userId = 'user-id';
      const category = '2';

      const store = mockStore({
        session: {
          questionsNumber: 3,
          difficulty: 'hard',
          questions,
          timeStarted: new Date().getTime(),
        },
        user: {
          userId,
        },
        course: {
          courses: [{ id: category, courseId }]
        }
      });

      beforeEach(() => {
        MockDate.set('1987-01-01T00:00:02'); // 2 seconds later
        return store.dispatch(operations.sendAnswers(courseId));
      });

      it('should dispatch START AND END REQUEST actions', () => {
        expect(store.getActions()).toEqual([
          {
            type: commonTypes.START_REQUEST,
          },
          {
            type: commonTypes.END_REQUEST,
          },
        ]);
      });

      it('should call stats service with expected gathered statistics', () => {
        expect(statsService.updateSession).toHaveBeenCalledTimes(1);
        expect(statsService.updateSession).toHaveBeenCalledWith(userId, courseId, expectedSessionStats);
      });
    });

    describe('when stats service POST to /courses/{courseId} fails', () => {

      beforeAll(() => {
        statsService.updateSession.mockImplementation(() => Promise.reject({ message: 'Internal server error '}));
      });

      const userId = 'user-id';
      const category = staticCourses[0].id;

      const store = mockStore({
        session: {
          questionsNumber: 3,
          difficulty: 'hard',
          questions,
        },
        user: {
          userId,
        },
        course: {
          courses: [{ id: category, courseId }]
        }
      });

      beforeEach(() => {
        return store.dispatch(operations.sendAnswers(courseId));
      });

      it('should dispatch START AND END REQUEST actions', () => {
        expect(store.getActions()).toEqual([
          {
            type: commonTypes.START_REQUEST,
          },
          {
            type: commonTypes.END_REQUEST,
          },
        ]);
      });
    });
  });
});