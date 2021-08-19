import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AlarmIcon from '@material-ui/icons/Alarm';
import { makeStyles } from '@material-ui/styles';
import {Chip, Paper} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {addAppointment, setIsInstructorSelected} from '../../redux/slices/newAppointmentSlice';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0.5',
    backgroundColor: '#f7f8fa',
  },
  container: {
    marginTop: '4rem',
  },
  chip: {
    margin: '0.5',
  },
  addInstructorBtn: {
    position: 'relative',
    top: '7rem',
    left: '35rem',
  },
}));

const AppointmentSettings = ({instructor}) => {
  const dispatch = useDispatch();
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
    dispatch(addAppointment({id: instructor._id}));
    dispatch(setIsInstructorSelected({id: instructor._id, isSelected: true}));
  }

  const classes = useStyles();

  return (
    <>
      {!instructor.isSelected &&
        <Fab onClick={handleAddInstructor} className={classes.addInstructorBtn} color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      }
      {instructor.isSelected &&
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
      }
    </>
  );
};

export default AppointmentSettings;