import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import AppointmentDate from './AppointmentDate/AppointmentDate';
import {getInstructors, resetAppointments} from '../../redux/slices/newAppointmentSlice';
import AppointmentChooseInstructor from './AppointmentChooseInstructor/AppointmentСhooseInstructor';
import {getInstructorsSelector, getIsLoadingsAppointmentsSelector} from '../../redux/selectors/newAppointmentSelector';
import {Button, CircularProgress} from '@material-ui/core';

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
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoadingsAppointmentsSelector);
  const instructors = useSelector(getInstructorsSelector);

  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);

  const onReset = () => {
    dispatch(resetAppointments());
  }

  const classes = useStyles();

  return (
    <>
    {
      isLoading ? <CircularProgress className={classes.preloader}/> :
        <div className='container'>
          <h2>Создать новую запись</h2>
          <Button onClick={onReset} className={classes.resetBtn} variant="outlined">Сбросить</Button>
          <AppointmentDate/>

          <AppointmentChooseInstructor instructors={instructors}/>
        </div>
    }
    </>
  );
}

export default NewAppointment;