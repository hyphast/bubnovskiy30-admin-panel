import React, {useEffect} from 'react';
import AppointmentDate from './AppointmentDate';
import {useDispatch, useSelector} from 'react-redux';
import AppointmentChooseInstructor from './AppointmentСhooseInstructor';
import {getInstructors} from '../../redux/slices/newAppointmentSlice';

const NewAppointment = () => {
  const dispatch = useDispatch();
  const instructors = useSelector(state => state.newAppointment.instructors);

  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);

  return (
    <div className='container'>
      <h2>Создать новую запись</h2>
      <AppointmentDate/>

      <AppointmentChooseInstructor instructors={instructors}/>
    </div>
  );
}

export default NewAppointment;