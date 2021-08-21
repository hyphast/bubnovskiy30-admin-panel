import React, {useEffect} from 'react';
import {Typography, Tabs, Tab, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import classnames from 'classnames';
import {TabPanel} from './TabPanel/TabPanel';
import CreateAppointment from './CreateAppointment/CreateAppointment';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '1rem',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
  tabs: {
    borderRight: '1px solid #dfdfdf',
    backgroundColor: '#fff',
  },
  selected: {
    color: 'green',
  },
  notSelected: {
    color: 'red',
  },
  tab: {
    width: '200px',
  }
}));

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

  const AppointmentChooseInstructor = ({instructors, setIsSubmit}) => {
    const [curTab, setCurTab] = React.useState(0);

    const handleChange = (event, newValue) => {
      setCurTab(newValue);
    };

    useEffect(() => {
      const val = instructors.findIndex((item, i, arr) => item.isSelected && arr[i + 1] && !arr[i + 1].isSelected);
      if (val > -1) {
        setCurTab(val);
      }
    }, [instructors])

    const classes = useStyles();

    return (
      <div className={classes.container}>
        <Typography color="textSecondary" gutterBottom>
          Выбор инструкторов
        </Typography>
          <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs
                variant="scrollable"
                value={curTab}
                onChange={handleChange}
                className={classes.tabs}
                textColor="inherit"
                TabIndicatorProps={{style: {background:'#92aee8'}}}
              >
                {instructors.map((inst, i) =>
                  <Tab key={inst._id}
                       className={classnames(classes.tab,
                                           {[classes.notSelected]: !inst.isSelected},
                                           {[classes.selected]: inst.isSelected})
                       }
                       label={inst.fullName}
                       {...a11yProps(i)}
                  />
                )}
              </Tabs>
            </Box>
            {instructors.map((inst, i) =>
              <TabPanel key={inst._id} value={curTab} index={i}>
                <CreateAppointment setIsSubmit={setIsSubmit} instructor={inst}/>
              </TabPanel>
            )}
          </Box>
      </div>
    );
};

export default AppointmentChooseInstructor;