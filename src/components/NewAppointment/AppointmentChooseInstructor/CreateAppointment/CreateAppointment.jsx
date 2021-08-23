import React, {useEffect, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addAppointment, setIsInstructorSelected, resetMessage} from '../../../../redux/slices/newAppointmentSlice';
import AppointmentSettings from './AppointmentSettings/AppointmentSettings';
import AlertComponent from '../../../common/Alert/AlertComponent';
import {getMessageAppointmentsSelector} from '../../../../redux/selectors/newAppointmentSelector';

const useStyles = makeStyles(() => ({
  addInstructorBtn: {
    position: 'relative',
    top: '7rem',
    left: '35rem',
  },
}));

const CreateAppointment = ({instructor, setIsSubmit}) => {
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();
  const message = useSelector(getMessageAppointmentsSelector);

  useEffect(() => {
    setMsg(true);
    return () => {
      dispatch(resetMessage());
    }
  }, [message, setMsg])

  const handleAddInstructor = () => {
    dispatch(addAppointment({id: instructor._id}));
    dispatch(setIsInstructorSelected({id: instructor._id, isSelected: true}));
  }

  const classes = useStyles();

  return (
    <>
      {!instructor.isSelected &&
        <Fab onClick={handleAddInstructor} className={classes.addInstructorBtn} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      }
      {instructor.isSelected && <AppointmentSettings setIsSubmit={setIsSubmit} instructor={instructor}/>}

      {message && <AlertComponent onClose={setMsg} open={msg} text={message} type='success' ver='top' hor='center'/>}
    </>
  );
};

export default CreateAppointment;