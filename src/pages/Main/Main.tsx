import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Layout, Spin } from 'antd';
import ListBoards from './components/ListBoards';
import { boardsOperation } from '../../reducer/boards/boards';
import * as boardsSelector from '../../reducer/boards/selectors'
import * as  userSelector from '../../reducer/user/selectors';
import { LoadingStatus } from '../../const';
import { IAppState, IUser, TId } from '../../types';

interface MainProps {
  user: IUser | null,
  boardsStatus: LoadingStatus;
  loadBoards: (userId: TId) => void;
};

const { Content } = Layout;

const Main: React.FC<MainProps> = (props) => {
  const { boardsStatus, user, loadBoards } = props;
  useEffect(() => {
    if (user && boardsStatus === LoadingStatus.INIT) {
      loadBoards(user.id)
    }
  });

  if (boardsStatus !== LoadingStatus.SUCSESS) {
    return <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
  }

  return (
    <Content style={{ padding: '50px' }}>
      <ListBoards />
    </Content>
  );
};

export { Main };

const mapStateToPorps = (state: IAppState) => ({
  boardsStatus: boardsSelector.getBoardsStatus(state),
  user: userSelector.getUser(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => {
  return {
    loadBoards(userId: TId) {
      dispatch(boardsOperation.loadBoards(userId));
    },
  }
};

export default connect(mapStateToPorps, mapDispatchToProps)(Main);
