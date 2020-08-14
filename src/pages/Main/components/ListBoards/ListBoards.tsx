import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import * as boardsSelector from '../../../../reducer/boards/selectors';
import { boardsActionCreator } from '../../../../reducer/boards/boards';
import { IAppState, IBoard, TId } from '../../../../types';
import { AppRout } from '../../../../const';

// TODO : review
interface ListBoardsProps {
  boards: IBoard[] | [];
  setActiveBoardId: (activeBoardId: TId) => void;
};

const ListBoards: React.FC<ListBoardsProps> = (props) => {
  const { boards, setActiveBoardId } = props;

  return (
    <List
      header={<p><b>LIST OF BOARDS</b></p>}
      bordered
      dataSource={boards}
      renderItem={(board: IBoard) => (
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

const mapStateToPorps = (state: IAppState) => ({
  boards: boardsSelector.getBoards(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveBoardId(boardId: TId) {
    dispatch(boardsActionCreator.setActiveBoardId(boardId))
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(ListBoards);
