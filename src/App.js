import React from 'react';
import {Container} from '@material-ui/core';
import NewAppointment from './components/NewAppointment/NewAppointment';
import './App.css';
import AppDrawer from './components/AppDrawer/AppDrawer';
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import CreatedAppointments from './components/CreatedAppointments/CreatedAppointments';


function App() {
  return (
    <BrowserRouter>
      <AppDrawer>
        <Container>
          <Switch>
            <Route path='/new-appointment'>
              <NewAppointment/>
            </Route>
            <Route path='/created-appointments'>
              <CreatedAppointments/>
            </Route>
          </Switch>
        </Container>
      </AppDrawer>
    </BrowserRouter>
  );
}


export default App;
