import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Layout } from 'antd';
import Login from '../../pages/Login';
import Routes from '../Routes';
import { TAppState, TId, TUser } from '../../types';
import { getAuthorizationStatus, getUser } from '../../reducer/user/selectors';
import {
  Operation as BoardsOperation,
  ActionCreator as BoardActionCreator,
} from '../../reducer/boards/boards';
import {
  Operation as TasksOperation,
  ActionCreator as TaskActionCreator,

} from '../../reducer/tasks/tasks';
import { AuthorizationStatus, PathKey } from '../../const';
import { getActiveBoardId } from '../../reducer/boards/selectors';
import { getActiveTaskId } from '../../reducer/tasks/selectors';
import { getPathKeyValue } from '../../utils/utils';

interface TProps {
  authorizationStatus: string;
  user: TUser;
  activeBoardId: TId;
  activeTaskId: TId;
  loadBoards: (userId: TId) => void;
  loadTasks: (userId: TId) => void;
  setActiveBoardId: (boardId: TId) => void;
  setActiveTaskId: (taskId: TId) => void;
};

const App = (props: TProps) => {
  const {
    authorizationStatus,
    user,
    activeBoardId,
    activeTaskId,
    loadBoards,
    loadTasks,
    setActiveBoardId,
    setActiveTaskId,
  } = props;
  const path = window.location.pathname;
  const boardId = Number(getPathKeyValue(path, PathKey.BOARD)) || -1;
  const taskId = Number(getPathKeyValue(path, PathKey.TASK)) || -1;

  if ((boardId !== activeBoardId) && (boardId !== -1)) {
    setActiveBoardId(boardId);
  }

  if ((taskId !== activeTaskId) && (taskId !== -1)) {
    setActiveTaskId(taskId);
  }


  if (authorizationStatus === AuthorizationStatus.AUTH) {
    loadBoards(user.id);
    loadTasks(user.id);
  }

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      {
        authorizationStatus === AuthorizationStatus.AUTH
          ? <Routes />
          : <Login />
      }
    </Layout>
  );
}

const mapSteteToProps = (state: TAppState) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
  activeBoardId: getActiveBoardId(state),
  activeTaskId: getActiveTaskId(state),
});


const mapDispatchToPorps = (dispatch: ThunkDispatch<TAppState, void, Action>) => ({
  setActiveBoardId(boardId: TId) {
    dispatch(BoardActionCreator.setActiveBoardId(boardId));
  },
  setActiveTaskId(taskId: TId) {
    dispatch(TaskActionCreator.setActiveTaskId(taskId));
  },
  loadBoards(userId: TId) {
    dispatch(BoardsOperation.loadBoards(userId));
  },
  loadTasks(userId: TId) {
    dispatch(TasksOperation.loadTasks(userId));
  },
});

export default connect(mapSteteToProps, mapDispatchToPorps)(App);
