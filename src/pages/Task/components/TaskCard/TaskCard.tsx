import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import * as tasksSelector from '../../../../reducer/tasks/selectors';
import { IAppState, ITask } from '../../../../types';

interface TaskCardProps {
  task: ITask | null;
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { task } = props;

  if (task === null) {
    return <div></div>;
  }

  return (
    <Card title={task.title}>
      {task.description}
    </Card>
  );
};

export { TaskCard };

const mapStateToPorps = (state: IAppState) => ({
  task: tasksSelector.getTask(state),
});

export default connect(mapStateToPorps)(TaskCard);
