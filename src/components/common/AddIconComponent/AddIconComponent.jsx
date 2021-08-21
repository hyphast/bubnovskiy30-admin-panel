import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  addBtn: {
    width: '36px',
    height: '36px',
    position: 'relative',
    top: '-1.5px',
    left: '4px',
  },
}));

const AddIconComponent = ({setOpen}) => {

  const classes = useStyles();
  return (
    <Fab onClick={() => setOpen(true)} className={classes.addBtn} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};

export default AddIconComponent;