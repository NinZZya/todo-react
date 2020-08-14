import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import HeaderApp from '../components/HeaderApp';
import Main from '../pages/Main';

const Routes = () => {
  return (
    <>
      <HeaderApp />
      <Switch>
        <Route exact path='/' component={Main} />
      </Switch>
    </>
  );
};

export default Routes;
