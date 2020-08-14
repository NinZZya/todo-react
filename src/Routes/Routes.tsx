import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import HeaderApp from '../components/HeaderApp';
import Main from '../pages/Main';
import Board from '../pages/Board';
import Task from '../pages/Task';
import { AppRout } from '../const';

const Routes = () => {

  return (
    <>
      <HeaderApp />
      <Switch>
        <Route exact path={AppRout.ROOT} component={Main} />
        <Route exact path={`${AppRout.BOARD}/:boardId`} component={Board} />
        <Route exact path={`${AppRout.BOARD}/:boardId${AppRout.TASK}/:taskId`} component={Task} />
      </Switch>
    </>
  );
};

export default Routes;
