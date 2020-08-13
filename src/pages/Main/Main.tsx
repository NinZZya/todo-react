import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Layout, Spin } from 'antd';
import ListBoards from '../../components/lists/ListBoards';
import { getBoardsStatus } from '../../reducer/boards/selectors';
import { ActionCreator } from '../../reducer/boards/boards';
import { TAppState, TStatus, TBoards, TId } from '../../types';
import { Status } from '../../const';

const { Content } = Layout;

interface TProps {
  boards: TBoards | null;
  boardsStatus: TStatus;
};

const Main = (props: TProps) => {
  const { boardsStatus } = props;

  if (boardsStatus !== Status.LOADED) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <ListBoards />
    </Content>
  );
};

export { Main };

const mapStateToPorps = (state: TAppState) => ({
  boardsStatus: getBoardsStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveBoardId(activeBoardId: TId) {
    dispatch(ActionCreator.setActiveBoardId(activeBoardId))
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(Main);
