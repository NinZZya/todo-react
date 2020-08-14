import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import TaskCard from './components/TaskCard';
import * as tasksSelector from '../../reducer/tasks/selectors';
import * as boardSelector from '../../reducer/boards/selectors';
import { IAppState, TId } from '../../types';
import { LoadingStatus } from '../../const';

interface TaskProps {
  tasksStatus: LoadingStatus;
  boardsStatus: LoadingStatus;
  activeBoardId: TId;
};

const { Content } = Layout;

const Task: React.FC<TaskProps> = (props) => {
  const { tasksStatus, boardsStatus } = props;


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
  boardsStatus: boardSelector.getBoardsStatus(state),
  activeBoardId: boardSelector.getActiveBoardId(state),
});

export default connect(mapStateToPorps)(Task);
