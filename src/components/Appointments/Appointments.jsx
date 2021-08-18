import React from 'react';
import LuxonUtils from '@date-io/luxon';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import AppointmentDate from './AppointmentDate/AppointmentDate';
import AppointmentInstructors from './AppointmentInstructors/AppointmentInstructors';

const Appointments = () => {

  return (
    <div className='container'>
      <h2>Создать новую запись</h2>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <form noValidate autoComplete="off">
          <AppointmentDate/>

          <AppointmentInstructors/>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default Appointments;