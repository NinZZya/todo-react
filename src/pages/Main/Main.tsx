import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import ListBoards from '../../components/lists/ListBoards';
import { getBoardsStatus } from '../../reducer/boards/selectors';
import { TAppState, TStatus } from '../../types';
import { Status } from '../../const';

interface TProps {
  boardsStatus: TStatus;
};

const { Content } = Layout;

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

export default connect(mapStateToPorps)(Main);
