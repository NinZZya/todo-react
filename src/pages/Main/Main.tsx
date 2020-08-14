import React from 'react';
import { Layout, Spin } from 'antd';

const { Content } = Layout;

const Main = () => {

  return (
    <Content style={{ padding: '50px' }}>
      <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
    </Content>
  );
};

export default Main;
