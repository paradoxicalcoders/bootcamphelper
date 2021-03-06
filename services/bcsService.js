const axios = require('axios');

// With your login credentials you can potentially access all the following endpoints with base URL
// https://bootcampspot.com/api/instructor/v1

const BASE_URL = 'https://bootcampspot.com/api/instructor/v1';

const bcs = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = {
  // Login (/login) Allows to get an authorization token with a set of credentials.
  login: async (email, password) => {
    try {
      const { data: auth } = await bcs.post('/login', { email, password });
      return auth;
    } catch (error) {
      throw error;
    }
  },
  // Me (/me) Provides detailed profile and authorization information for the caller.
  me: async (authtoken) => {
    try {
      return bcs.get('/me', {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
  // Attendance (/attendance) Lists attendance status of all students in a course, for all sessions.
  attendance: async (body, { authtoken }) => {
    try {
      return bcs.post('/attendance', body, {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
  // Grades (/grades)
  // Lists homework submission grades of all students in a course, for all assignments.
  grades: async (body, { authtoken }) => {
    try {
      return bcs.post('/grades', body, {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
  // Sessions (/sessions) Lists all sessions.
  sessions: async (id, { authtoken }) => {
    try {
      return bcs.post('/sessions', { enrollmentId: +id }, {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
  // Session Detail (/sessionDetail) Lists details for the specified session.
  sessionDetail: async (id, { authtoken }) => {
    try {
      return bcs.post('/sessionDetail', { sessionId: +id }, {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
  // Assignments (/assignments) Lists all assignments.
  assignments: async (body, { authtoken }) => {
    try {
      return bcs.post('/assignments', body, {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
  // Assignment Detail (/assignmentDetail) Lists details on a specified assignment.
  assignmentDetail: async (body, { authtoken }) => {
    try {
      return bcs.post('/assignmentDetail', body, {
        headers: { authtoken },
      });
    } catch (error) {
      throw error;
    }
  },
};
