import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import ListTasks from './components/ListTasks';
import * as tasksSelectors from '../../reducer/tasks/selectors';
import { LoadingStatus } from '../../const';
import { IAppState } from '../../types';

interface BoardProps {
  tasksStatus: LoadingStatus;
};

const { Content } = Layout;

const Board: React.FC<BoardProps> = (props) => {
  const { tasksStatus } = props;

  if (tasksStatus !== LoadingStatus.SUCCESS) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <ListTasks />
    </Content>
  );
};

export { Board };

const mapStateToPorps = (state: IAppState) => ({
  tasksStatus: tasksSelectors.getTasksStatus(state),
});

export default connect(mapStateToPorps)(Board);
