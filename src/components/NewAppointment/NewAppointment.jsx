import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import AppointmentDate from './AppointmentDate/AppointmentDate';
import {Button, CircularProgress} from '@material-ui/core';
import {initializeNewAppointments, resetAppointments, setAppointments} from '../../redux/slices/newAppointmentSlice';
import AppointmentChooseInstructor from './AppointmentChooseInstructor/AppointmentСhooseInstructor';
import {getInstructorsSelector, getIsLoadingsAppointmentsSelector,} from '../../redux/selectors/newAppointmentSelector';
import NewAppointmentError from './NewAppointmentError';
import NewAppointmentMessage from './NewAppointmentMessage';

const useStyles = makeStyles(() => ({
  resetBtn: {
    position: 'absolute',
    top: '1.5rem',
    left: '24rem',
    width: '90px',
    height: '32px',
  },
  preloader: {
    position: 'absolute',
    left: '43rem',
    top: '15rem',
  },
}));

const NewAppointment = () => {
  const [date, setDate] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const isLoading = useSelector(getIsLoadingsAppointmentsSelector);
  const instructors = useSelector(getInstructorsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    isSubmit && dispatch(setAppointments(+new Date(date)));
    return () => {
      setIsSubmit(false);
    }
  }, [isSubmit, dispatch, date])

  useEffect(() => {
    dispatch(initializeNewAppointments());
  }, [dispatch]);

  const onReset = () => {
    dispatch(resetAppointments());
  }

  const classes = useStyles();

  return (
    <>
      {
        isLoading ? <CircularProgress className={classes.preloader}/> :
          <div className="container">
            <h2>Создать новую запись</h2>
            <Button onClick={onReset} className={classes.resetBtn} variant="outlined">Сбросить</Button>
            <AppointmentDate setDate={setDate}/>

            <AppointmentChooseInstructor setIsSubmit={setIsSubmit} instructors={instructors}/>
            <NewAppointmentError/>
            <NewAppointmentMessage/>
          </div>
      }
    </>
  );
}

export default NewAppointment;