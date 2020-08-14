import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Login from '../pages/Login';
import Routes from '../Routes';
import { IAppState } from '../types';
import { getUserStatus } from '../reducer/user/selectors';
import { UserStatus } from '../const';

interface TProps {
  userStatus: UserStatus;
};

const App = (props: TProps) => {
  const { userStatus } = props;

  return (
    <Layout style={{ backgroundColor: '#fff', padding: '50px' }}>
     {
        userStatus === UserStatus.AUTH
          ? <Routes />
          : <Login />
      }
    </Layout>
  );
}

const mapSteteToProps = (state: IAppState) => ({
  userStatus: getUserStatus(state),
});

export default connect(mapSteteToProps)(App);
