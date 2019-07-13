import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AdminCourses from 'components/AdminCourses';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box>
        <h1>Admin Dashboard</h1>
        <AdminCourses courses={this.props.courses} socket={this.props.socket} />
      </Box>
    );
  }
}

AdminDashboard.propTypes = {
  socket: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      cohortId: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      programName: PropTypes.string,
      programType: PropTypes.string,
      universityName: PropTypes.string,
      universityLogo: PropTypes.string,
      maxAbsences: PropTypes.number,
      maxRemotes: PropTypes.number,
      maxMissedGeneral: PropTypes.number,
      maxMissedRequired: PropTypes.number,
    }),
  ),
};

export default AdminDashboard;
