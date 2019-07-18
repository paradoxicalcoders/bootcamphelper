import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import SimpleCard from 'components/SimpleCard';

const customSelectStyles = {
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
      resource: [],
      title: '',
      url: '',
      tags: [],
      selectedTags: [],
      tabValue: 2,
      urlError: '',
      snackbarVariant: 'warning',
      snackbarMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validUrl = this.validUrl.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentDidMount() {
    this.getTags();
    this.getResources();
  }

  async getTags() {
    try {
      const response = await axios.get('/api/v1/tags');
      const tags = response.data && response.data.map(tag => (
        {
          label: tag.name,
          value: tag.id,
        }
      ));

      this.setState({
        tags,
      });
    } catch (err) {
      this.setState({
        snackbarMessage: err.toString(),
        snackbarVariant: 'error',
      });
    }
  }

  async getResources() {
    try {
      const response = await axios.get('/api/v1/resources');
      console.log('resources', response);
      this.setState({
        resources: response.data,
        tabValue: 1,
      });
    } catch (err) {
      this.setState({
        snackbarMessage: err.toString(),
        snackbarVariant: 'error',
      });
    }
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
      return (
        <Box
          display="flex"
          justifyContent="center"
        >
          <h2>Favorites</h2>
        </Box>
      );
    }
    if (this.state.tabValue === 1) {
      console.log(this.state.resources);
      return (
        <Box
          px={5}
          pt={3}
          pb={5}
          display="flex"
          flexWrap="wrap"
        >
          {this.state.resources.map(resource => (
            <SimpleCard
              key={resource.id}
              title={resource.title}
              url={resource.url}
              tags={resource.Tags}
            />
          ))}
        </Box>
      );
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
              helperText={this.state.urlError}
              error={!!this.state.urlError}
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
              options={this.state.tags}
              placeholder="Tags"
              value={this.state.selectedTags}
              onChange={this.handleTagsChange}
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
              disabled={this.saveButtonEnabled()}
            >
              Save Resource
            </Button>
          </Box>
        </form>
      </Box>
    );
  }

  saveButtonEnabled() {
    const { title, url, selectedTags } = this.state;
    return !title || !url || !selectedTags.length > 0;
  }

  handleTabChange(event, newValue) {
    this.setState({
      tabValue: newValue,
    });
  }

  handleTagsChange(selectedTags) {
    this.setState({
      selectedTags,
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      if (name === 'url') this.validUrl();
    });
  }

  validUrl() {
    if (!isUrl(this.state.url)) {
      this.setState({
        urlError: 'Not a valid URL',
      });
      return false;
    }
    this.setState({
      urlError: '',
    });
    return true;
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!this.validUrl()) return;

    this.setState({
      isLoading: true,
    });

    try {
      const tags = this.state.selectedTags.map(tag => tag.value);
      const response = await axios.post('/api/v1/resources', {
        url: this.state.url,
        title: this.state.title,
        tags,
        UserId: this.props.userId,
      });

      if (response.data) {
        this.getResources();
        this.setState({
          snackbarMessage: 'Resource added!',
          snackbarVariant: 'success',
          url: '',
          title: '',
          selectedTags: [],
        });
      } else {
        throw new Error('An unexpected error occurred.');
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

Resources.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Resources;
