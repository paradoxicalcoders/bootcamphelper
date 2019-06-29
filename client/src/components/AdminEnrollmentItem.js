import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class AdminEnrollmentItem extends Component {
  render() {
    const { 
      id,
      courseId,
      cohortId,
      startDate,
      endDate,
    } = this.props.enrollment;

    const {
      isSelected,
      onClick,
    } = this.props;

    return (
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onClick={onClick}
            value={id}
          />
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell>{courseId}</TableCell>
        <TableCell>{cohortId}</TableCell>
        <TableCell>{startDate}</TableCell>
        <TableCell>{endDate}</TableCell>
      </TableRow>
    );
  }
}

export default AdminEnrollmentItem;