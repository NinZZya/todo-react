import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { getBoards } from '../../../reducer/boards/selectors';
import { ActionCreator } from '../../../reducer/boards/boards';
import { TAppState, TBoards, TId } from '../../../types';
import { AppRout } from '../../../const';

interface TProps {
  boards: TBoards;
  setActiveBoardId: (activeBoardId: TId) => void;
};

const ListBoards = (props: TProps) => {
  const { boards, setActiveBoardId } = props;

  return (
    <List
      header={<p><b>LIST OF BOARDS</b></p>}
      bordered
      dataSource={boards}
      renderItem={(board) => (
        <List.Item>
          <Link
            to={`${AppRout.BOARD}/${board.id}`}
            onClick={() => setActiveBoardId(board.id)}
          >
            <FolderOutlined />{' \n'}
            {board.title}
          </Link>
        </List.Item>
      )}
    />
  );
};

export { ListBoards };

const mapStateToPorps = (state: TAppState) => ({
  boards: getBoards(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveBoardId(boardId: TId) {
    dispatch(ActionCreator.setActiveBoardId(boardId))
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(ListBoards);
