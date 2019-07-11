import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Gravatar from 'components/Gravatar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const BootcampAppbar = (props) => {
  const classes = useStyles();

  const {
    email,
    handleDrawerToggle,
    onSignOut,
  } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          Helper
        </Typography>
        <Gravatar email={email} />
        <Button
          color="inherit"
          onClick={onSignOut}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

BootcampAppbar.propTypes = {
  email: PropTypes.string.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default BootcampAppbar;
