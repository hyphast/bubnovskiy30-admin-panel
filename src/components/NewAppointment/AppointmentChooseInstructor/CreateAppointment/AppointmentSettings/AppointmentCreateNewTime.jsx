import React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import {LocalizationProvider, StaticTimePicker} from '@material-ui/lab';
import {Box, Button, Modal, TextField} from '@material-ui/core';
import ruLocale from 'date-fns/locale/ru';
import {makeStyles} from '@material-ui/styles';
import {useDispatch} from 'react-redux';
import {createAppointmentTime} from '../../../../../redux/slices/newAppointmentSlice';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '440px',
    height: '370px',
    bgcolor: 'background.paper',
    padding: 1,
  },
  newTimeBtn: {
    position: 'relative',
    left: '20.5rem',
    top: '-3.1rem',
  },
}));

const AppointmentCreateNewTime = ({instructor, appointment, setError, setOpen, open, setTextError}) => {
  const [selectedTime, setSelectedTime] = React.useState(false);
  const dispatch = useDispatch();

  const onNewTime = () => {
    setOpen(false);
    if (!selectedTime) {
      setError(true);
      setTextError('Вы не выбрали время!');
    } else if (appointment[0].times.some(elem => elem.time === +new Date(selectedTime))) {
      setError(true);
      setTextError('Такое время уже есть!');
    } else {
      dispatch(createAppointmentTime({id: instructor._id, time: +new Date(selectedTime)}));
    }
  }

  const classes = useStyles();

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.root}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <StaticTimePicker
              displayStaticWrapperAs='desktop'
              label="Время"
              value={selectedTime}
              onChange={(newValue) => {
                setSelectedTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button className={classes.newTimeBtn} onClick={() => onNewTime()} variant="outlined">Выбрать</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentCreateNewTime;