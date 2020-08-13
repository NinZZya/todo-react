import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Layout, Spin } from 'antd';
import ListBoards from '../../components/lists/ListBoards';
import { getBoards } from '../../reducer/boards/selectors';
import { ActionCreator, initialState } from '../../reducer/boards/boards';
import { TAppState, TBoards, TId } from '../../types';

const { Content } = Layout;

interface TProps {
  boards: TBoards | null;
};

const initialBoards = initialState.boards;

const Main = (props: TProps) => {
  const { boards } = props;
  if (boards === initialBoards) {
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
  boards: getBoards(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveBoardId(activeBoardId: TId) {
    dispatch(ActionCreator.setActiveBoardId(activeBoardId))
  },
});

export default connect(mapStateToPorps, mapDispatchToProps)(Main);
