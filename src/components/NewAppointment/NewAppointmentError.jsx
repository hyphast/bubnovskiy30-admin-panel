import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AlertComponent from '../common/Alert/AlertComponent';
import {resetError} from '../../redux/slices/newAppointmentSlice';
import {getErrorAppointmentsSelector} from '../../redux/selectors/newAppointmentSelector';

const NewAppointmentError = (props) => {
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(getErrorAppointmentsSelector);

  useEffect(() => {
    setErr(true);
    return () => {
      dispatch(resetError());
    }
  }, [error, setErr, dispatch])

  return (
    <>
      {error && <AlertComponent onClose={setErr} open={err} text={error} type='error' ver='top' hor='right'/>}
    </>
  );
};

export default NewAppointmentError;