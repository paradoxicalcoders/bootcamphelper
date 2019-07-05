import React, { Component } from 'react';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green, red, purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = {
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[900],
  },
  info: {
    backgroundColor: purple[300]
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: '8px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
};

class BootcampSnackbar extends Component {

  render() {
    const {
      anchorOrigin,
      open,
      message,
      onClose,
      variant,
      className,
      classes,
      ...other
    } = this.props;

    const Icon = variantIcon[variant];

    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        onClose={onClose}
        message={message}
        autoHideDuration={5000}
        className={className}
      >
        <SnackbarContent
          className={clsx(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          {...other}
        />
      </Snackbar>
    );
  }
}

Snackbar.defaultProps = {
  anchorOrigin: { horizontal: 'right', vertical: 'top' },
  variant: 'info',
};

export default withStyles(styles)(BootcampSnackbar);