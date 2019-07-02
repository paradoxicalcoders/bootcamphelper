import React from 'react';
import dayjs from 'dayjs';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const printJson = obj => JSON.stringify(obj, null, 2);

const EnrollmentItem = ({
  id,
  programType,
  programName,
  startDate,
  endDate,
}) => {

  const _dow = dayjs(startDate).format('dddd');
  const _startDate = dayjs(startDate).format('MMMM d, YYYY');
  const _endDate = dayjs(endDate).format('MMMM d, YYYY');

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{programType}</TableCell>
      <TableCell>{programName}</TableCell>
      <TableCell>{_dow}</TableCell>
      <TableCell>{_startDate}</TableCell>
      <TableCell>{_endDate}</TableCell>
    </TableRow>
  );
}

const Enrollments = ({
  enrollments
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
      <Paper>
        <pre>{printJson(enrollments)}</pre>
      </Paper>
    </Box>
  );

export default Enrollments;