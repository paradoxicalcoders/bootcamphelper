import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class AdminCouseItem extends Component {
  render() {
    const {
      id,
      programType,
      programName,
      startDate,
      endDate,
    } = this.props.course;

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
        <TableCell>{programType}</TableCell>
        <TableCell>{programName}</TableCell>
        <TableCell align="center">{dayjs(startDate).format('dddd')}</TableCell>
        <TableCell align="right">{dayjs(startDate).format('MMMM d, YYYY')}</TableCell>
        <TableCell align="right">{dayjs(endDate).format('MMMM d, YYYY')}</TableCell>
      </TableRow>
    );
  }
}

AdminCouseItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    programType: PropTypes.string.isRequired,
    programName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AdminCouseItem;
