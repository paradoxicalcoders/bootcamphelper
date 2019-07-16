import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import { makeStyles } from '@material-ui/core/styles';
// import { blue } from '@material-ui/core/colors';

const fistToFive = ['FIST', '1', '2', '3', '4', '5'];
// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// });

const SimpleDialog = ({
  onClose, question, selectedValue, ...other
}) => {
  function handleClose() {
    onClose(false, selectedValue);
  }

  function handleListItemClick(value) {
    const newValue = value === 'FIST' ? 0 : value;
    onClose(false, +newValue);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Fist to Five - {question}</DialogTitle>
      <List>
        {fistToFive.map(count => (
          <ListItem button onClick={() => handleListItemClick(count)} key={count}>
            <ListItemText primary={count} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  question: PropTypes.string,
  selectedValue: PropTypes.string,
};

export default SimpleDialog;
