import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LinkIcon from '@material-ui/icons/Link';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const drawerTagManager = (isAdmin) => {
  if (!isAdmin) return null;
  return (
    <ListItem component={RouterLink} to="/tag-manager" button>
      <ListItemIcon><LabelImportantIcon /></ListItemIcon>
      <ListItemText primary="Tag Manager" />
    </ListItem>
  );
};

const drawerItems = isAdmin => (
  <div>
    <Divider />
    <List>
      <ListItem component={RouterLink} to="/dashboard" button>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={RouterLink} to="/resources" button>
        <ListItemIcon><LinkIcon /></ListItemIcon>
        <ListItemText primary="Resources" />
      </ListItem>
    </List>
    {drawerTagManager(isAdmin)}
  </div>
);

const BootcampDrawer = (props) => {
  const classes = useStyles();

  const {
    handleDrawerToggle,
    mobileOpen,
    isAdmin,
  } = props;

  return (
    <nav className={classes.drawer} aria-label="Drawer Menu">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerItems(isAdmin)}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawerItems(isAdmin)}
        </Drawer>
      </Hidden>
    </nav>
  );
};

BootcampDrawer.propTypes = {
  // drawerTagManager: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default BootcampDrawer;
