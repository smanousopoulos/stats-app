import fetch from '../utils/fetch';

const host = 'http://localhost:8081';

const updateSession = (userId, courseId, session) => {
  const params = {
    url: `${host}/courses/${courseId}`,
    method: 'post',
    headers: {
      'x-user-id': userId,
      'content-type': 'application/json',
    },
    body: session,
  };
  return fetch(params);
};

const fetchSession = (userId, courseId, sessionId) => {
  const params = {
    url: `${host}/courses/${courseId}/sessions/${sessionId}`,
    method: 'get',
    headers: {
      'x-user-id': userId,
    }
  };
  return fetch(params);
};

const fetchCourseAggregate = (userId, courseId) => {
  const params = {
    url: `${host}/courses/${courseId}`,
    method: 'get',
    headers: {
      'x-user-id': userId,
    }
  };
  return fetch(params);
};

export {
  updateSession,
  fetchSession,
  fetchCourseAggregate,
};