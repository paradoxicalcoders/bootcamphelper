import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';

import ContentWrapper from 'components/ContentWrapper';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      tabValue: 2,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <ContentWrapper>
        <h1>Resources</h1>
        <Paper square>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange}
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
        >
          <TextField
            id="outlined-adornment-link"
            variant="outlined"
            type="text"
            label="URL"
            value={this.state.url}
            // onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
    );
  }

  handleChange(event, newValue) {
    this.setState({
      tabValue: newValue,
    });
  }
}

export default Resources;
