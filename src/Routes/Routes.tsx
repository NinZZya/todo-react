import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import HeaderApp from '../components/HeaderApp';
import Main from '../pages/Main';
import Board from '../pages/Board';
import { AppRout } from '../const';

const Routes = () => {
  return (
    <>
      <HeaderApp />
      <Switch>
        <Route exact path={AppRout.ROOT} component={Main} />
        <Route exact path={`${AppRout.BOARD}/:boardId`}  component={Board} />
      </Switch>
    </>
  );
};

export default Routes;
