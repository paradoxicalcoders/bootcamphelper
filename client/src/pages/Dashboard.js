import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminDashboard from 'components/AdminDashboard';
import ContentWrapper from 'components/ContentWrapper';
import Enrollments from 'components/Enrollments';

class Dashboard extends Component {
  render() {
    return (
      <ContentWrapper>
        {this.renderDashboards()}
      </ContentWrapper>
    );
  }

  renderDashboards() {
    if (this.props.userAccount && this.props.userAccount.isAdmin) {
      return (
        <AdminDashboard courses={this.props.userAccount.courses} socket={this.props.socket} />
      );
    }
    return this.renderCourses();
  }

  renderCourses() {
    if (this.props.userAccount && this.props.userAccount.courses) {
      return (
        <Enrollments enrollments={this.props.userAccount.courses} openModal={this.openModal} />
      );
    }
    // TODO: Need to review a best practice for a fallback
    return (<div></div>);
  }
}

Dashboard.propTypes = {
  socket: PropTypes.object.isRequired,
  userAccount: PropTypes.object.isRequired,
};

export default Dashboard;
