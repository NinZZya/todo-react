import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Login from '../../pages/Login';
import Routes from '../Routes';
import { TAppState } from '../../types';
import { getAuthorizationStatus } from '../../reducer/user/selectors';
import { AuthorizationStatus } from '../../const';

interface TProps {
  authorizationStatus: string;
};

const App = (props: TProps) => {
  const { authorizationStatus } = props;

  return (
    <Layout style={{ backgroundColor: '#fff', padding: '50px' }}>
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
});

export default connect(mapSteteToProps)(App);
