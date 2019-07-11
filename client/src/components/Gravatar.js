import React from 'react';
import PropTypes from 'prop-types';
import ReactGravatar from 'react-gravatar';
import Box from '@material-ui/core/Box';


const Gravatar = ({ email }) => (
  <Box pr={1}>
    <ReactGravatar email={email || 'blah@blah.com'} size={35} />
  </Box>);

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Gravatar;
