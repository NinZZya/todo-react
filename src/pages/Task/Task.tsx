import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Layout, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import TaskCard from './components/TaskCard';
import * as userSelector from '../../reducer/user/selectors';
import * as boardsSelector from '../../reducer/boards/selectors';
import * as tasksSelector from '../../reducer/tasks/selectors';
import { boardsOperation } from '../../reducer/boards/boards';
import { tasksOperation } from '../../reducer/tasks/tasks';
import { boardsActionCreator } from '../../reducer/boards/boards';
import { tasksActionCreator } from '../../reducer/tasks/tasks';
import { IAppState, TId, IUser } from '../../types';
import { LoadingStatus } from '../../const';

interface TaskProps {
  boardsStatus: LoadingStatus;
  tasksStatus: LoadingStatus;
  activeBoardId: TId;
  activeTaskId: TId;
  user: IUser | null;
  loadBoards: (userId: TId) => void;
  loadTasks: (userId: TId) => void;
  setActiveBoardId: (boardId: TId) => void;
  setActiveTaskId: (taskId: TId) => void;
};

const { Content } = Layout;

const Task: React.FC<TaskProps> = (props) => {
  const {
    tasksStatus,
    boardsStatus,
    activeBoardId,
    activeTaskId,
    user,
    loadBoards,
    loadTasks,
    setActiveBoardId,
    setActiveTaskId,
  } = props;

  const params: any = useParams();
  const boardId = !isNaN(Number(params.boardId)) ? Number(params.boardId) : -1;
  const taskId = !isNaN(Number(params.taskId)) ? Number(params.taskId) : -1;

  if (boardId !== -1 && activeBoardId !== boardId) {
    setActiveBoardId(boardId);
  }

  if (taskId !== -1 && activeTaskId !== taskId) {
    setActiveTaskId(taskId);
  }

  useEffect(() => {
    if (user && boardsStatus === LoadingStatus.INIT) {
      loadBoards(user.id);
    }

    if (user && tasksStatus === LoadingStatus.INIT) {
      loadTasks(user.id);
    }
  });

  if ((tasksStatus !== LoadingStatus.SUCCESS) || (boardsStatus !== LoadingStatus.SUCCESS)) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <TaskCard />
    </Content>
  );
};

export { Task };

const mapStateToPorps = (state: IAppState) => ({
  tasksStatus: tasksSelector.getTasksStatus(state),
  boardsStatus: boardsSelector.getBoardsStatus(state),
  activeBoardId: boardsSelector.getActiveBoardId(state),
  activeTaskId: tasksSelector.getActiveTaskId(state),
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
    setActiveBoardId(boardId: TId) {
      dispatch(boardsActionCreator.setActiveBoardId(boardId))
    },
    setActiveTaskId(boardId: TId) {
      dispatch(tasksActionCreator.setActiveTaskId(boardId))
    },
  }
};

export default connect(mapStateToPorps, mapDispatchToProps)(Task);
