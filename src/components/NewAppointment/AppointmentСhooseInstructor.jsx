import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classnames from 'classnames';
import {TabPanel} from './TabPanel/TabPanel';
import { makeStyles } from '@material-ui/styles';
import AppointmentSettings from './AppointmentSettings';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: '1px solid gray',
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

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const AppointmentChooseInstructor = ({instructors}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const val = instructors.findIndex((item, i, arr) => item.isSelected && arr[i + 1] && !arr[i + 1].isSelected);
    if(val > -1) {
      setValue(val);
    }
  }, [instructors])

  const classes = useStyles();

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Выбор инструкторов
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
        {instructors.map((inst, i) =>
          <Tab key={inst._id}
                      className={classnames(classes.tab, {[classes.notSelected]: !inst.isSelected}, {[classes.selected]: inst.isSelected})}
                      label={inst.fullName}
                      {...a11yProps(i)}
          />
        )}
        </Tabs>
        </Box>
        {instructors.map((inst, i) =>
          <TabPanel key={inst._id} value={value} index={i}>
            <AppointmentSettings instructor={inst} />
          </TabPanel>
          )}
      </Box>
    </>
  );
};

export default AppointmentChooseInstructor;