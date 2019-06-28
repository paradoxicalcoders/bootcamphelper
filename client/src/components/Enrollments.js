import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const printJson = obj => JSON.stringify(obj, null, 2);

const EnrollmentItem = (props) => (
  <TableRow>
    <TableCell>{props.enrollment.id}</TableCell>
    <TableCell>{props.enrollment.courseId}</TableCell>
    <TableCell>{props.enrollment.cohortId}</TableCell>
    <TableCell>{props.enrollment.startDate}</TableCell>
    <TableCell>{props.enrollment.endDate}</TableCell>
  </TableRow>
);

const Enrollments = (props) => (
  <Container>
    <h1 className="">Enrollments</h1>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Program Type</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.enrollments.map(enrollment => (<EnrollmentItem enrollment={enrollment} key={enrollment.id} />))}
        </TableBody>
      </Table>
    </Paper>
    <Paper>
      <pre>{printJson(props.enrollments)}</pre>
    </Paper>
  </Container>
);

export default Enrollments;