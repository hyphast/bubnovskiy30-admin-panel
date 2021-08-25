import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {useDispatch} from 'react-redux';
import {addAppointment, setIsInstructorSelected} from '../../../../redux/slices/newAppointmentSlice';
import AppointmentSettings from './AppointmentSettings/AppointmentSettings';
import AddIconComponent from '../../../common/AddIconComponent/AddIconComponent';

const useStyles = makeStyles(() => ({
  addInstructorBtn: {
    position: 'relative',
    top: '7rem',
    left: '35rem',
  },
}));

const CreateAppointment = ({instructor, setIsSubmit}) => {
  const dispatch = useDispatch();

  const handleAddInstructor = () => {
    dispatch(addAppointment({id: instructor._id, name: instructor.fullName}));
    dispatch(setIsInstructorSelected({id: instructor._id, isSelected: true}));
  }

  const classes = useStyles();

  return (
    <>
      {!instructor.isSelected &&
        <AddIconComponent onClick={handleAddInstructor} className={classes.addInstructorBtn}/>
      }
      {instructor.isSelected && <AppointmentSettings setIsSubmit={setIsSubmit} instructor={instructor}/>}
    </>
  );
};

export default CreateAppointment;