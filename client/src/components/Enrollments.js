import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// const printJson = obj => JSON.stringify(obj, null, 2);

const EnrollmentItem = ({
  id,
  programType,
  programName,
  startDate,
  endDate,
}) => (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{programType}</TableCell>
      <TableCell>{programName}</TableCell>
      <TableCell>{dayjs(startDate).format('dddd')}</TableCell>
      <TableCell>{dayjs(startDate).format('MMMM d, YYYY')}</TableCell>
      <TableCell>{dayjs(endDate).format('MMMM d, YYYY')}</TableCell>
    </TableRow>);

const Enrollments = ({
  enrollments,
}) => (
    <Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Program Type</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Day of Week</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              enrollments.map(enrollment => (
                <EnrollmentItem
                  key={enrollment.id}
                  id={enrollment.id}
                  programType={enrollment.programType}
                  programName={enrollment.programName}
                  startDate={enrollment.startDate}
                  endDate={enrollment.endDate}
                />
              ))
            }
          </TableBody>
        </Table>
      </Paper>
      {/* <Paper>
        <pre>{printJson(enrollments)}</pre>
      </Paper> */}
    </Box>);

EnrollmentItem.propTypes = {
  id: PropTypes.number.isRequired,
  programType: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

Enrollments.propTypes = {
  enrollments: PropTypes.arrayOf(
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

export default Enrollments;
