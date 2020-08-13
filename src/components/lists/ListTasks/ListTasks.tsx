import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { ActionCreator } from '../../../reducer/tasks/tasks';
import { getActiveBoardId, getBoard } from '../../../reducer/boards/selectors';
import { getActiveBoardTasks } from '../../../reducer/tasks/selectors';
import { TAppState, TTasks, TId, TBoard } from '../../../types';
import { AppRout } from '../../../const';

interface TProps {
  activeBoardId: any,
  board: TBoard;
  tasks: TTasks;
  setActiveTaskId: (tasktId: TId) => void;
};

const ListTasks: React.FC<TProps> = (props: TProps) => {
  const { board, tasks, setActiveTaskId } = props;

  return (
    <List
      header={<p><b>TASKS OF BOARD "{board.title.toLocaleUpperCase()}"</b></p>}
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <Link
            to={`${AppRout.BOARD}/${task.id}${AppRout.TASK}/${task.id}`}
            onClick={() => setActiveTaskId(task.id)}
          >
            <FileOutlined /> {task.title}
          </Link>
        </List.Item>
      )}
    />
  );
};

export { ListTasks };

const mapStateToPorps = (state: TAppState) => ({
  activeBoardId: getActiveBoardId(state),
  board: getBoard(state),
  tasks: getActiveBoardTasks(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveTaskId(taskId: TId) {
    dispatch(ActionCreator.setActiveTaskId(taskId))
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(ListTasks);
