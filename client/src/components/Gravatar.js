import React from 'react';
import ReactGravatar from 'react-gravatar';
import Box from '@material-ui/core/Box';


const Gravatar = (props) => {

  const {
    email,
  } = props;

  return (
    <Box pr={1}>
      <ReactGravatar email={email ? email : 'blah@blah.com'} size={35} />
    </Box>
  );
}

export default Gravatar;