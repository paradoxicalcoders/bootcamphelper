import React, { Component } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import AdminCourseItem from './AdminCourseItem';
import Snackbar from './Snackbar';

class AdminCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClasses: [],
      selectAll: false,
      question: '',
      questionCreated: null,
      questionTitle: null,
      responses: [],
      responseCount: 0,
      snackbarVariant: 'warning',
      snackbarMessage: '',
    };

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.onClassSelect = this.onClassSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentDidMount() {
    console.log(this.props, 'admin props');
    // this.addResponse();
  }

  render() {
    return (
      <Box>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={this.props.courses.length === this.state.selectedClasses.length}
                    onChange={this.toggleSelectAll}
                    value={this.state.selectAll}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Program Type</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Day of Week</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.courses.map(course => (
                <AdminCourseItem
                  key={course.id}
                  course={course}
                  isSelected={this.state.selectedClasses.indexOf(course.id) !== -1}
                  onClick={this.onClassSelect}
                />))
              }
            </TableBody>
          </Table>
        </Paper>

        <Box mt={5}>
          <Paper mt={4}>
            <Box py={5} px={10}>
              <form
                onSubmit={this.handleSubmit}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="question"
                  label="Fist to Five Question"
                  name="question"
                  autoFocus
                  value={this.state.question}
                  onChange={this.handleChange}
                />
                <Box mt={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!(this.state.question && this.state.selectedClasses.length > 0)}
                  >
                    Submit Question
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>

        {this.state.questionCreated ? (
          <Box mt={5}>
            <Paper mt={4}>
              <Box py={5} px={10} align={"center"}>
                <h2>{this.state.questionTitle}</h2>
                <p>Response Count: {this.state.responseCount} <b>|</b> Average: {this.average()}</p>
              </Box>
            </Paper>
          </Box>
        ) : false}

        <Snackbar
          open={!!this.state.snackbarMessage}
          onClose={this.closeSnackbar}
          message={this.state.snackbarMessage}
          variant={this.state.snackbarVariant}
        />
      </Box>
    );
  }

  average() {
    const { responses } = this.state;
    if (responses.length) {
      let sum = responses.reduce((previous, current) => current += previous);
      let avg = sum / responses.length;
      return parseFloat(avg).toFixed(1);
    } else {
      return 0
    }
  }

  toggleSelectAll(e) {
    const checked = e.target.checked;
    let selectedClasses = this.state.selectedClasses;
    if (!checked) {
      selectedClasses = [];
    } else {
      selectedClasses = this.props.courses.map((course) => {
        return course.id;
      });
    }

    this.setState({
      selectedClasses,
    }, () => console.log(this.state.selectedClasses))
  }

  onClassSelect(e) {
    const isChecked = e.target.checked;
    const value = parseInt(e.target.value, 10);
    let selectedClasses = this.state.selectedClasses;

    if (isChecked && selectedClasses.indexOf(value) === -1) {
      selectedClasses.push(value);
    } else if (!isChecked) {
      selectedClasses = selectedClasses.filter(id => id !== value);
    }

    this.setState({
      selectedClasses,
    }, () => console.log(this.state.selectedClasses));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      const { socket } = this.props;
      const { selectedClasses } = this.state;
      const response = await axios.post('/api/v1/questions', {
        question: this.state.question,
        enrollments: this.state.selectedClasses,
      });
      console.log(response.data);
      const { question } = response.data;

      socket.emit('SEND_QUESTION', { question, selectedClasses });
      this.setState({
        questionCreated: true,
        questionTitle: question,
        isLoading: false,
        snackbarMessage: 'New question created!',
        snackbarVariant: 'success',
        question: '',
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isLoading: false,
        snackbarMessage: err.toString(),
        snackbarVariant: 'error',
      });
    }
  }

  closeSnackbar() {
    this.setState({
      snackbarMessage: '',
    })
  }

  addResponse() {
    const { socket } = this.props;
    socket.on('GET_RESPONSE', (response) => {
      console.log(response, " - RESPONSE");
      let { responseCount } = this.state;
      this.setState(prevState => ({
        responses: [...prevState.responses, response],
        responseCount: responseCount + 1
      }))
    });
  }
}

export default AdminCourses;
