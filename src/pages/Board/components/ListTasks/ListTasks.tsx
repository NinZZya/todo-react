import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { tasksActionCreator } from '../../../../reducer/tasks/tasks';
import * as boardsSelector from '../../../../reducer/boards/selectors';
import * as tasksSelector from '../../../../reducer/tasks/selectors';
import { IAppState, ITask, TId, IBoard } from '../../../../types';
import { AppRout } from '../../../../const';

interface ListTasksProps {
  activeBoardId: TId,
  board: IBoard | null;
  tasks: ITask[] | [];
  setActiveTaskId: (tasktId: TId) => void;
};

const ListTasks: React.FC<ListTasksProps> = (props) => {
  const { board, tasks, activeBoardId, setActiveTaskId } = props;

  if(board === null || activeBoardId === -1) {
    return <div></div>;
  }

  return (
    <List
      header={<p><b>TASKS OF BOARD "{board.title.toLocaleUpperCase()}"</b></p>}
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <Link
            to={`${AppRout.BOARD}/${activeBoardId}${AppRout.TASK}/${task.id}`}
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

const mapStateToPorps = (state: IAppState) => ({
  activeBoardId: boardsSelector.getActiveBoardId(state),
  board: boardsSelector.getBoard(state),
  tasks: tasksSelector.getActiveBoardTasks(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveTaskId(taskId: TId) {
    dispatch(tasksActionCreator.setActiveTaskId(taskId))
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(ListTasks);
