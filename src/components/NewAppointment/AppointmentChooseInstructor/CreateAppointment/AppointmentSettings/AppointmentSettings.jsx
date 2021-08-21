import React, {useMemo} from 'react';
import {Chip} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/styles';
import {format, fromUnixTime} from 'date-fns';
import AppointmentCreateNewTime from './AppointmentCreateNewTime';
import AppointmentsSubmitBtn from './AppointmentsSubmitBtn';
import AlertComponent from '../../../../common/Alert/AlertComponent';
import AddIconComponent from '../../../../common/AddIconComponent/AddIconComponent';
import {deleteAppointmentTime} from '../../../../../redux/slices/newAppointmentSlice';
import {getOneAppointmentSelector} from '../../../../../redux/selectors/newAppointmentSelector';

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
}));

const AppointmentSettings = ({instructor}) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [textError, setTextError] = React.useState('');

  const selectAppointment = useMemo(getOneAppointmentSelector, []);
  const dispatch = useDispatch();

  const appointment = useSelector(state => selectAppointment(state, instructor._id));

  const handleDelete = (timeToDelete) => {
    dispatch(deleteAppointmentTime({id: instructor._id, time: timeToDelete}));
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h3 style={{fontWeight: '400'}}>Время для записи:</h3>
      <div className={classes.root}>
        {appointment[0].time.length && appointment[0].time.map((time) => {
          return (
            <li key={time[0]}>
              <Chip
                label={format(fromUnixTime(time[0]), 'H:mm')}
                variant="outlined"
                color="primary"
                onDelete={() => handleDelete(time[0])}
                className={classes.chip}
              />
            </li>
          );
        })}
        <AddIconComponent setOpen={setOpen}/>

        <AppointmentCreateNewTime setTextError={setTextError}
                                  instructor={instructor}
                                  appointment={appointment}
                                  setError={setError}
                                  setOpen={setOpen}
                                  open={open}
        />

        {error && <AlertComponent setError={setError} error={error} textError={textError}/>}

        <AppointmentsSubmitBtn/>
      </div>
    </div>
  );
};

export default AppointmentSettings;