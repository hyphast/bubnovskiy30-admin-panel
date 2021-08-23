import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {DatePicker} from '@material-ui/lab';

const AppointmentDate = ({setDate}) => {
  const [value, setValue] = React.useState(new Date());

  useEffect(() => {
    setDate(value);
  }, [value, setDate])

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Дата
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <DatePicker
          value={value}
          inputFormat="dd/MM/yyyy"
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