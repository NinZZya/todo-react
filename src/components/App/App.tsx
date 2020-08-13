import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Layout } from 'antd';
import Login from '../../pages/Login';
import Routes from '../Routes';
import { TAppState, TId, TUser } from '../../types';
import { getAuthorizationStatus, getUser } from '../../reducer/user/selectors';
import { Operation as BoardsOperation } from '../../reducer/boards/boards';
import { AuthorizationStatus } from '../../const';

interface TProps {
  authorizationStatus: string;
  user: TUser;
  loadBoards: (userId: TId) => void;
};

const App = (props: TProps) => {
  const { authorizationStatus, user, loadBoards } = props;

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    loadBoards(user.id);
  }

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      {
        authorizationStatus === AuthorizationStatus.AUTH
          ? <Routes />
          : <Login />
      }
    </Layout>
  );
}

const mapSteteToProps = (state: TAppState) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
});


const mapDispatchToPorps = (dispatch: ThunkDispatch<TAppState, void, Action>) => ({
  loadBoards(userId: TId) {
    dispatch(BoardsOperation.loadBoards(userId));
  },
});

export default connect(mapSteteToProps, mapDispatchToPorps)(App);
