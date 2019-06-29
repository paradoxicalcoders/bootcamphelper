import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import AdminEnrollments from 'components/AdminEnrollments';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Box>
        <h1>Admin Dashboard</h1>
        <AdminEnrollments enrollments={this.props.enrollments} />
      </Box>
    );
  }
}

export default AdminDashboard;
