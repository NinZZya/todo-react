import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { getTask } from '../../reducer/tasks/selectors';
import { TAppState, TTask } from '../../types';

interface TProps {
  task: TTask;
};

const TaskCard = (props: TProps) => {
  const { task } = props;

  return (
    <Card title={task.title}>
      {task.description}
    </Card>
  );
};

export { TaskCard };

const mapStateToPorps = (state: TAppState) => ({
  task: getTask(state),
});

export default connect(mapStateToPorps)(TaskCard);
