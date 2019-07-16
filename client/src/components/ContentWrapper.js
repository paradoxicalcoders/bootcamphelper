import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

class ContentWrapper extends Component {
  render() {
    return (
      <Box>
        <Container>
          <Box pt={11}>
            {this.props.children}
          </Box>
        </Container>
      </Box>
    );
  }
}

ContentWrapper.propTypes = {
  children: PropTypes.array,
};

export default ContentWrapper;
