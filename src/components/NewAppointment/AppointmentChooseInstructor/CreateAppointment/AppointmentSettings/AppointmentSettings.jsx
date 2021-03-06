import React, {useMemo, useState} from 'react';
import {Chip} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {format} from 'date-fns';
import AppointmentCreateNewTime from './AppointmentCreateNewTime';
import AppointmentsSubmitBtn from './AppointmentsSubmitBtn';
import AlertComponent from '../../../../common/Alert/AlertComponent';
import AddIconComponent from '../../../../common/AddIconComponent/AddIconComponent';
import {deleteAppointmentTime} from '../../../../../redux/slices/newAppointmentSlice';
import {getInstructorTime} from '../../../../../redux/selectors/newAppointmentSelector';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0.5',
    backgroundColor: 'white',
  },
  container: {
    marginTop: '3rem',
  },
  chip: {
    margin: '0 0.3rem 0.3rem 0',
  },
  addBtn: {
    width: '36px',
    height: '36px',
    position: 'relative',
    top: '-1.5px',
    left: '4px',
  }
}));

const AppointmentSettings = ({instructor, setIsSubmit}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState('');

  const selectAppointment = useMemo(getInstructorTime, []);
  const dispatch = useDispatch();

  const instructorTime = useSelector(state => selectAppointment(state, instructor._id));

  const handleDelete = (timeToDelete) => {
    dispatch(deleteAppointmentTime({id: instructor._id, time: timeToDelete}));
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3 style={{fontWeight: '400'}}>Время для записи:</h3>
      <div className={classes.root}>
        {!!instructorTime.length && instructorTime.map((time) => {
          return (
            <li key={time}>
              <Chip
                label={format(time, 'H:mm')}
                variant="outlined"
                color="primary"
                onDelete={() => handleDelete(time)}
                className={classes.chip}
              />
            </li>
          );
        })}
        <AddIconComponent onClick={() => setOpen(true)} className={classes.addBtn} />

        <AppointmentCreateNewTime setTextError={setTextError}
                                  instructor={instructor}
                                  instructorTime={instructorTime}
                                  setError={setError}
                                  setOpen={setOpen}
                                  open={open}
        />

        {error && <AlertComponent type='error' onClose={setError} open={error} text={textError} ver='top' hor='right'/>}

      </div>
      <AppointmentsSubmitBtn setIsSubmit={setIsSubmit}/>
    </div>
  );
};

export default AppointmentSettings;