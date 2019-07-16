import React, { Component } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import isUrl from 'validator/lib/isURL';
import Select from 'react-select';

import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';

import ContentWrapper from 'components/ContentWrapper';
import Snackbar from 'components/Snackbar';

const suggestions = [
  { label: 'JavaScript' },
  { label: 'SQL' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const customSelectStyles = {
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  control: provided => ({
    ...provided,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: '1rem',
    paddingLeft: 4,
  }),
};

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      tabValue: 2,
      snackbarVariant: 'warning',
      snackbarMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  render() {
    return (
      <ContentWrapper>
        <h1>Resources</h1>
        <Paper square>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleTabChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab icon={<FavoriteIcon />} label="FAVORITES" />
            <Tab icon={<FilterListIcon />} label="ALL" />
            <Tab icon={<AddIcon />} label="NEW" />
          </Tabs>
        </Paper>
        <Paper square>
          <Box py={2} my={3}>
            {this.renderTabContent()}
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

  renderTabContent() {
    if (this.state.tabValue === 0) {
      return <h2>Favorites</h2>;
    }
    if (this.state.tabValue === 1) {
      return <h2>My List</h2>;
    }
    return (
      <Box
        display="flex"
        justifyContent="center"
      >
        <form
          onSubmit={this.handleSubmit}
          style={
            {
              width: '100%', maxWidth: 600, paddingLeft: 10, paddingRight: 10,
            }
          }
        >
          <Box my={2}>
            <TextField
              id="outlined-adornment-title"
              variant="outlined"
              type="text"
              label="Title"
              fullWidth
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TitleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box my={2}>
            <TextField
              id="outlined-adornment-link"
              variant="outlined"
              type="text"
              label="URL"
              fullWidth
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LinkIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box my={2}>
            <Select
              id="tags"
              options={suggestions}
              placeholder="Tags"
              // value={multi}
              // onChange={handleChangeMulti}
              isMulti
              styles={customSelectStyles}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: '#3f51b5',
                },
              })}
            />
          </Box>
          <Box mt={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.state.isLoading || !this.state.title || !this.state.url}
            >
              Save Resource
            </Button>
          </Box>
        </form>
      </Box>
    );
  }

  handleTabChange(event, newValue) {
    this.setState({
      tabValue: newValue,
    });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!isUrl(this.state.url)) {
      this.setState({
        snackbarMessage: 'Invalid URL',
        snackbarVariant: 'error',
      });
      return;
    }

    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.post('/api/v1/resources', {
        url: this.state.url,
        title: this.state.title,
      });

      if (response.data) {
        const { tags } = this.state;
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
    });
  }
}

export default Resources;
