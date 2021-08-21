import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  submitBtn: {
    position: 'absolute',
    top: '35rem',
    left: '72rem',
  },
}));

const AppointmentsSubmitBtn = (props) => {

  const classes = useStyles();

  return (
    <>
      <Button className={classes.submitBtn} variant="outlined" color="success">
        Создать
      </Button>
    </>
  );
};

export default AppointmentsSubmitBtn;