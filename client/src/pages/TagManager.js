import React, { Component } from 'react';
import axios from 'axios';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import ContentWrapper from 'components/ContentWrapper';

class TagManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: '',
      isLoading: false,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <ContentWrapper>
        <h1>Tag Manager</h1>
        <Paper square>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-adornment-tag"
              variant="outlined"
              type="text"
              label="Tag"
              value={this.state.url}
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
                disabled={this.state.isLoading}
              >
                Add Tag
              </Button>
            </Box>
          </form>
        </Paper>
      </ContentWrapper>
    );
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
        name: this.state.tagName,
      });

      if (response.data) {
        console.log(response.data);
        return this.setState({
          isLoading: false,
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
}

export default TagManager;
