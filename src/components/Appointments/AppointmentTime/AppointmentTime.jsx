import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AlarmIcon from '@material-ui/icons/Alarm';
import {makeStyles} from '@material-ui/core/styles';
import {Chip, Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    backgroundColor: '#f7f8fa',
  },
  container: {
    marginTop: '4rem',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  addInstructorBtn: {
    position: 'relative',
    top: '7rem',
    left: '35rem',
  },
}));

const AppointmentTime = () => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: '11:00' },
    { key: 1, label: '13:00' },
    { key: 2, label: '15:00' },
    { key: 3, label: '17:00' },
    { key: 4, label: '20:00' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleAddInstructor = () => {

  }

  const classes = useStyles();

  return (
    <>
      {/*<Fab onClick={handleAddInstructor} className={classes.addInstructorBtn} color="secondary" aria-label="add">*/}
      {/*  <AddIcon />*/}
      {/*</Fab>*/}
      <div className={classes.container}>
        <h3 style={{fontWeight: '400'}}>Время для записи:</h3>
        <Paper component="ul" className={classes.root}>
          {chipData.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  avatar={<AlarmIcon/>}
                  label={data.label}
                  onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </Paper>
      </div>
    </>
  );
};

export default AppointmentTime;