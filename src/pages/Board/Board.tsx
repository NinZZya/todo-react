import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import FilterTasks from '../../components/filters/FilterTasks';
import ListTasks from '../../components/lists/ListTasks';
import { getTasksStatus } from '../../reducer/tasks/selectors';
import { TAppState, TStatus } from '../../types';
import { Status } from '../../const';
interface TProps {
  tasksStatus: TStatus;
};

const { Content } = Layout;

const Board = (props: TProps) => {
  const { tasksStatus } = props;

  if (tasksStatus !== Status.LOADED) {
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

const mapStateToPorps = (state: TAppState) => ({
  tasksStatus: getTasksStatus(state),
});

export default connect(mapStateToPorps)(Board);
