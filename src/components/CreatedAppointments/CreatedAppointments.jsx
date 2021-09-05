import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Avatar,
  Card,
  CardContent,
  CardHeader, Chip, CircularProgress, Stack,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {getCreatedAppointments} from '../../redux/slices/createdAppointmentsSlice';
import {
  getCreatedAppointmentsSelector,
  getIsLoadingsCreatedAppointmentsSelector,
} from '../../redux/selectors/newAppointmentSelector';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale'
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  preloader: {
    position: 'absolute',
    left: '43rem',
    top: '15rem',
  },
}));

const CreatedAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(getCreatedAppointmentsSelector);
  const isLoading = useSelector(getIsLoadingsCreatedAppointmentsSelector);
  console.log(appointments[0]?.date);

  useEffect(() => {
    dispatch(getCreatedAppointments());
  }, [dispatch]);

  const classes = useStyles();

  if(isLoading) {
    return <CircularProgress className={classes.preloader}/>;
  }
  return (
    <div>
      {appointments.map(item =>
        <div key={item._id}>
          <Card variant="outlined" style={{marginTop: '1rem', border: '1px solid #acb0b5'}}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon/>
                </IconButton>
              }
              title={format(new Date(item.date), 'd MMMM yyyy eeee', {locale: ru})}
            />
            {item.appointments.map(app =>
              <div key={app._id}>
                <CardContent>
                  <Stack direction="row" spacing={1}>
                    <span style={{fontWeight: 700}}>Инструкторы:</span>
                    {app?.instructors.map(inst =>
                      <Chip
                        key={inst.instructorId}
                        avatar={<Avatar sx={{bgcolor: '#cad9ce'}} alt="Name"/>}
                        label={inst.instructorName}
                        variant="outlined"
                      />
                    )}
                  </Stack>
                  <Accordion style={{marginTop: '0.5rem'}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography style={{fontWeight: '700'}}>{format(new Date(app.time), 'H:mm')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {app.patients.length === 0 ? <span style={{fontStyle: 'italic'}}>Записей нет</span> :
                          app.patients.map(p =>
                          <Chip
                            key={p._id}
                            avatar={<Avatar sx={{bgcolor: '#b5f5c6'}} alt="Patient"/>}
                            label={p.patientName}
                            variant="outlined"
                          />
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreatedAppointments;