import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {DatePicker} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  date: {
    margin: '0 0 2rem 0rem',
  }
}));

const AppointmentDate = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  const classes = useStyles();

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Дата
      </Typography>
      <DatePicker className={classes.date} value={selectedDate} onChange={handleDateChange}/>
    </>
  );
};

export default AppointmentDate;