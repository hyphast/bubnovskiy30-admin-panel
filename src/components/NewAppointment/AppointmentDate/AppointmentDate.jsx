import React from 'react';
import Typography from '@material-ui/core/Typography';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {DatePicker} from '@material-ui/lab';

const AppointmentDate = (props) => {
  const [value, setValue] = React.useState(new Date());

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Дата
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default AppointmentDate;