import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HeaderApp from '../HeaderApp';
import Main from '../../pages/Main';
import Board from '../../pages/Board';
import { AppRout } from '../../const';

const Routes = () => {
  return (
    <Router>
      <HeaderApp />
      <Switch>
        <Route exact path={AppRout.ROOT} component={Main} />
      </Switch>
      <Switch>
        <Route exact path={`${AppRout.BOARD}/:boardId`} component={Board} />
      </Switch>
    </Router>
  );
};

export default Routes;
