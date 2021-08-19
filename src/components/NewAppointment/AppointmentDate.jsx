import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {DatePicker} from '@material-ui/lab';


// const useStyles = makeStyles((theme) => ({
//   date: {
//     margin: '0 0 2rem 0rem',
//   }
// }));

const AppointmentDate = (props) => {
  const [value, setValue] = React.useState(new Date());

  // const classes = useStyles();

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Дата
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Выбор даты"
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