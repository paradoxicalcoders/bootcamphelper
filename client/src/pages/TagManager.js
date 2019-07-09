import React, { Component } from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import ContentWrapper from 'components/ContentWrapper';
import Snackbar from 'components/Snackbar';

class TagManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTagName: '',
      isLoading: false,
      tags: [],
      snackbarVariant: 'warning',
      snackbarMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentDidMount() {
    this.getTags();
  }

  render() {
    return (
      <ContentWrapper>
        <h1>Tag Manager</h1>
        <Paper square>
          <Box display="flex" justifyContent="center" py={5}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="outlined-adornment-tag"
                variant="outlined"
                type="text"
                label="Tag"
                name="newTagName"
                value={this.state.newTagName}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <LabelImportantIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box mt={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={this.state.isLoading || !this.state.newTagName}
                >
                  Add Tag
                </Button>
              </Box>
            </form>
          </Box>
          <Box display="flex" justifyContent="center" pb={5}>
            {this.renderChips()}
          </Box>
        </Paper>
        <Snackbar
          open={!!this.state.snackbarMessage}
          onClose={this.closeSnackbar}
          message={this.state.snackbarMessage}
          variant={this.state.snackbarVariant}
        />
      </ContentWrapper>
    );
  }

  async getTags() {
    try {
      const response = await axios.get('/api/v1/tags');

      if (response.data) {
        return this.setState({
          tags: response.data,
        });
      }
      throw new Error('Houston, we have a problem');
    } catch (err) {
      let error = err.toString();
      this.setState({
        isLoading: false,
        error,
      });
    }
  }

  renderChips() {
    return this.state.tags.map((tag) => {
      return(
        <Box p={1} key={tag.id}>
          <Chip
            label={tag.name}
            onDelete={() => this.handleChipDelete(tag.id)}
          />
        </Box>
      );
    })
  }

  async handleChipDelete(id) {
    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.delete(`/api/v1/tags/${id}`);

      if (response.data) {
        const tags = this.state.tags.filter((tag) => {
          return tag.id !== id;
        });

        return this.setState({
          isLoading: false,
          tags,
          snackbarMessage: 'Tag deleted!',
          snackbarVariant: 'success',
        });
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        snackbarMessage: err.toString(),
        snackbarVariant: 'error',
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.post('/api/v1/tags', {
        name: this.state.newTagName,
      });

      if (response.data) {
        const tags = this.state.tags;
        tags.push(response.data);
        this.setState({
          isLoading: false,
          tags,
          snackbarMessage: 'Tag added!',
          snackbarVariant: 'success',
          newTagName: '',
        });
      }
    } catch (err) {
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
}

export default TagManager;
