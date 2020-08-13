import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Breadcrumb } from 'antd';
import { HomeOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons';
import { ActionCreator as BoardActionCreator } from '../../reducer/boards/boards';
import { ActionCreator as TaskActionCreator } from '../../reducer/tasks/tasks';
import { getBoard } from '../../reducer/boards/selectors';
import { getTask } from '../../reducer/tasks/selectors';
import { TAppState, TBoard, TTask } from '../../types';
import { AppRout } from '../../const';

interface TProps {
  board: TBoard;
  task: TTask;
  resetActiveBoardId: () => void;
  resetActiveTaskId: () => void;
};

const BreadcrumbApp = (props: TProps) => {
  const { board, task, resetActiveBoardId, resetActiveTaskId } = props;

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link
          to={AppRout.ROOT}
          onClick={() => {
            resetActiveBoardId();
            resetActiveTaskId();
          }}
        >
          <HomeOutlined /> Home
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link
          to={`${AppRout.BOARD}/${board.id}`}
          onClick={() => {
            resetActiveTaskId();
          }}
        >
          <FolderOutlined /> {board.title}
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item><FileOutlined /> {task.title}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export { BreadcrumbApp };

const mapStateToPorps = (state: TAppState) => ({
  board: getBoard(state),
  task: getTask(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetActiveBoardId() {
    dispatch(BoardActionCreator.resetActiveBoardId())
  },
  resetActiveTaskId() {
    dispatch(TaskActionCreator.resetActiveTaskId())
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(BreadcrumbApp);
