import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  render() {

    return (
      <Box>
        <Container>
          <Box pt={10}>
            <TextField
              id="outlined-adornment-password"
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
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Resources;
