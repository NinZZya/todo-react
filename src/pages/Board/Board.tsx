import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useParams } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import ListTasks from './components/ListTasks';
import FilterTasks from './components/FilterTasks';
import * as userSelector from '../../reducer/user/selectors';
import * as boardsSelector from '../../reducer/boards/selectors';
import * as tasksSelector from '../../reducer/tasks/selectors';
import { boardsOperation } from '../../reducer/boards/boards';
import { tasksOperation } from '../../reducer/tasks/tasks';
import { boardsActionCreator } from '../../reducer/boards/boards';
import { LoadingStatus } from '../../const';
import { IAppState, TId, IUser } from '../../types';

interface BoardProps {
  boardsStatus: LoadingStatus;
  tasksStatus: LoadingStatus;
  activeBoardId: TId;
  user: IUser | null;
  loadBoards: (userId: TId) => void;
  loadTasks: (userId: TId) => void;
  setActiveBoardId: (boardId: TId) => void;
};

const { Content } = Layout;

const Board: React.FC<BoardProps> = (props) => {
  const {
    boardsStatus,
    tasksStatus,
    activeBoardId,
    user,
    loadBoards,
    loadTasks,
    setActiveBoardId,
  } = props;

  const params: any = useParams();
  const boardId = !isNaN(Number(params.boardId)) ? Number(params.boardId) : -1;

  if (boardId !== -1 && activeBoardId !== boardId) {
    setActiveBoardId(boardId);
  }

  useEffect(() => {
    if (user && boardsStatus === LoadingStatus.INIT) {
      loadBoards(user.id);
    }

    if (user && tasksStatus === LoadingStatus.INIT) {
      loadTasks(user.id);
    }
  });

  if (tasksStatus !== LoadingStatus.SUCCESS) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <FilterTasks />
      </div>
      <ListTasks />
    </Content>
  );
};

export { Board };

const mapStateToPorps = (state: IAppState) => ({
  boardsStatus: boardsSelector.getBoardsStatus(state),
  tasksStatus: tasksSelector.getTasksStatus(state),
  activeBoardId: boardsSelector.getActiveBoardId(state),
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
  }
};

export default connect(mapStateToPorps, mapDispatchToProps)(Board);
