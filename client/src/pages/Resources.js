import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';

import ContentWrapper from 'components/ContentWrapper';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      tabValue: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
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
          style={{width: '100%', maxWidth: 600, paddingLeft: 10, paddingRight: 10 }}
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
}

export default Resources;
