import React from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  submitBtn: {
    position: 'relative',
    top: '5rem',
    left: '63rem',
  },
}));

const AppointmentsSubmitBtn = ({setIsSubmit}) => {
  const classes = useStyles();

  return (
    <>
      <Button onClick={() => setIsSubmit(true)}
              className={classes.submitBtn}
              variant="outlined"
              color="success"
      >
        Создать
      </Button>
    </>
  );
};

export default AppointmentsSubmitBtn;