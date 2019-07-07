import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import AdminDashboard from 'components/AdminDashboard';
import Enrollments from 'components/Enrollments';

class Dashboard extends Component {

  render() {
    return (
      <Box>
        <Container>
          <Box pt={10}>
            {this.renderDashboards()}
          </Box>
        </Container>
      </Box>
    );
  }

  renderDashboards() {
    if (this.props.userAccount && this.props.userAccount.isAdmin) {
      return (
        <AdminDashboard courses={this.props.userAccount.courses} socket={this.props.socket} />
      )
    }
    return this.renderCourses();
  }

  renderCourses() {
    if (this.props.userAccount && this.props.userAccount.courses) {
      return (
        <Enrollments enrollments={this.props.userAccount.courses} openModal={this.openModal} />
      )
    }
  }
}

export default Dashboard;
