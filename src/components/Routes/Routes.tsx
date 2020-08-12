import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HeaderApp from '../HeaderApp';
import Main from '../../pages/Main';

const Routes = () => {
  return (
    <Router>
      <HeaderApp />
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
};

export default Routes;
