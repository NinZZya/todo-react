import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import BreadcrumbApp from '../../components/BreadcrumbApp';
import TaskCard from '../../components/TaskCard';
import { getTasksStatus } from '../../reducer/tasks/selectors';
import { getActiveBoardId, getBoardsStatus } from '../../reducer/boards/selectors';
import { TAppState, TId, TStatus } from '../../types';
import { Status } from '../../const';

interface TProps {
  tasksStatus: TStatus;
  boardsStatus: TStatus;
  activeBoardId: TId;
};

const { Content } = Layout;

const Task = (props: TProps) => {
  const { tasksStatus, boardsStatus } = props;


  if ((tasksStatus !== Status.LOADED) || (boardsStatus !== Status.LOADED)) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <BreadcrumbApp />
      </div>
      <TaskCard />
    </Content>
  );
};

export { Task };

const mapStateToPorps = (state: TAppState) => ({
  tasksStatus: getTasksStatus(state),
  boardsStatus: getBoardsStatus(state),
  activeBoardId: getActiveBoardId(state),
});

export default connect(mapStateToPorps)(Task);
