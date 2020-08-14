import React from 'react';
import { Layout, Spin } from 'antd';


const { Content } = Layout;

const Board: React.FC = () => {

  return (
    <Content style={{ padding: '50px' }}>
      Board page
      <Spin style={{ padding: '50px', width: '100%' }} tip="Loading..."></Spin>
    </Content>
  );
};

export default Board;
