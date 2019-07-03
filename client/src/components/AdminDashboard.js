import React, { Component } from 'react';
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

export default AdminDashboard;
