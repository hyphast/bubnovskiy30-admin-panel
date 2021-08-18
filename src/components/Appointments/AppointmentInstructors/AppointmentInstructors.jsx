import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {TabPanel} from '../TabPanel/TabPanel';
import {makeStyles} from '@material-ui/core/styles';
import AppointmentTime from '../AppointmentTime/AppointmentTime';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: 'red',
  },
  selected: {
    color: 'green',
  }
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const AppointmentInstructors = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <>
      <Typography color="textSecondary" gutterBottom>
        Выбор инструкторов
      </Typography>
      <div className={classes.root}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Иванов Иван Николаевич" {...a11yProps(0)} />
          <Tab label="Дмитров Илья Викторович" {...a11yProps(1)} />
          <Tab label="Пскуратин Олег Валерьевич" {...a11yProps(2)} />
          <Tab label="Пшинчук Евгений Петрович" {...a11yProps(3)} />
          <Tab label="Олейников Егор Олегович" {...a11yProps(4)} />
          <Tab label="Олейников Виктор Петрович" {...a11yProps(5)} />
          <Tab label="Шишкин Кирилл Максимович" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AppointmentTime />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AppointmentTime />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AppointmentTime />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AppointmentTime />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AppointmentTime />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <AppointmentTime />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <AppointmentTime />
        </TabPanel>
      </div>
    </>
  );
};

export default AppointmentInstructors;