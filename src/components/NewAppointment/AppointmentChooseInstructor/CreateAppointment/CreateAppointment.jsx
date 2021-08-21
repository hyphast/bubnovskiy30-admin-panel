import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/styles';
import {useDispatch} from 'react-redux';
import {addAppointment, setIsInstructorSelected} from '../../../../redux/slices/newAppointmentSlice';
import AppointmentSettings from './AppointmentSettings/AppointmentSettings';

const useStyles = makeStyles(() => ({
  addInstructorBtn: {
    position: 'relative',
    top: '7rem',
    left: '35rem',
  },
}));

const CreateAppointment = ({instructor}) => {
  const dispatch = useDispatch();

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
      {instructor.isSelected && <AppointmentSettings instructor={instructor}/>}
    </>
  );
};

export default CreateAppointment;