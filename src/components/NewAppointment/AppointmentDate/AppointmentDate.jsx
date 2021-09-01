import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {DatePicker, PickersDay} from '@material-ui/lab';

const AppointmentDate = ({setDate}) => {
  const [value, setValue] = React.useState(new Date());
  const [highlightedDays, setHighlightedDays] = React.useState([29, 30, 31]);

  useEffect(() => {
    console.log(value)
    setDate(value);
  }, [value, setDate])

  const disableWeekends = (date) => {
    return date.getDay() === 0;
  }

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
          shouldDisableDate={disableWeekends}
          disablePast
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.getDate()) > 0;

            return (
              <PickersDay style={isSelected ? {backgroundColor: '#3bc42b', color: 'white'} : null}
                          {...DayComponentProps}
              />
            );
          }}
          />
      </LocalizationProvider>
    </>
  );
};

export default AppointmentDate;