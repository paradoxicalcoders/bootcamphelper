import React, { Component } from 'react';
import dayjs from 'dayjs';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class AdminEnrollmentItem extends Component {
  render() {
    const {
      id,
      programType,
      programName,
      startDate,
      endDate,
    } = this.props.enrollment;

    const {
      isSelected,
      onClick,
    } = this.props;

    const _dow = dayjs(startDate).format('dddd');
    const _startDate = dayjs(startDate).format('MMMM d, YYYY');
    const _endDate = dayjs(endDate).format('MMMM d, YYYY');

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
        <TableCell>{programType}</TableCell>
        <TableCell>{programName}</TableCell>
        <TableCell align="center">{_dow}</TableCell>
        <TableCell align="right">{_startDate}</TableCell>
        <TableCell align="right">{_endDate}</TableCell>
      </TableRow>
    );
  }
}

export default AdminEnrollmentItem;