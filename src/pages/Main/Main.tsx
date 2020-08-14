import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Layout, Spin } from 'antd';
import ListBoards from './components/ListBoards';
import { boardsOperation } from '../../reducer/boards/boards';
import { tasksOperation } from '../../reducer/tasks/tasks';
import * as boardsSelector from '../../reducer/boards/selectors';
import * as taskssSelector from '../../reducer/tasks/selectors'
import * as userSelector from '../../reducer/user/selectors';
import { LoadingStatus } from '../../const';
import { IAppState, IUser, TId } from '../../types';

interface MainProps {
  user: IUser | null,
  boardsStatus: LoadingStatus;
  tasksStatus: LoadingStatus;
  loadBoards: (userId: TId) => void;
  loadTasks: (userId: TId) => void;
};

const { Content } = Layout;

const Main: React.FC<MainProps> = (props) => {
  const { boardsStatus, tasksStatus, user, loadBoards, loadTasks } = props;
  useEffect(() => {
    if (user && boardsStatus === LoadingStatus.INIT) {
      loadBoards(user.id);
    }

    if (user && tasksStatus === LoadingStatus.INIT) {
      loadTasks(user.id);
    }
  });

  if (boardsStatus !== LoadingStatus.SUCCESS) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <ListBoards />
    </Content>
  );
};

export { Main };

const mapStateToPorps = (state: IAppState) => ({
  boardsStatus: boardsSelector.getBoardsStatus(state),
  tasksStatus: taskssSelector.getTasksStatus(state),
  user: userSelector.getUser(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
  return {
    loadBoards(userId: TId) {
      dispatch(boardsOperation.loadBoards(userId));
    },
    loadTasks(userId: TId) {
      dispatch(tasksOperation.loadTasks(userId));
    },
  }
};

export default connect(mapStateToPorps, mapDispatchToProps)(Main);
