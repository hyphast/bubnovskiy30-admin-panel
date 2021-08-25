import React, {useEffect, useState} from 'react';
import {resetMessage} from '../../redux/slices/newAppointmentSlice';
import {useDispatch, useSelector} from 'react-redux';
import {getMessageAppointmentsSelector} from '../../redux/selectors/newAppointmentSelector';
import AlertComponent from '../common/Alert/AlertComponent';

const NewAppointmentMessage = () => {
  const [msg, setMsg] = useState(false);
  const message = useSelector(getMessageAppointmentsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setMsg(true);
    return () => {
      dispatch(resetMessage());
    }
  }, [message, setMsg])
  return (
    <>
      {message && <AlertComponent onClose={setMsg} open={msg} text={message} type='success' ver='top' hor='center'/>}
    </>
  );
};

export default NewAppointmentMessage;