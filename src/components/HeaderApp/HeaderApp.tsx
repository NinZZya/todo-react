import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import MenuUser from './components/MenuUser';

const { Header } = Layout;

const HeaderApp = () => {

  return (
    <Header>
      <Row justify="space-between">
      <Col span={2}>
        <Link to='/'>
          TODO
        </Link>
      </Col>
      <Col span={2}>
        <MenuUser />
      </Col>
      </Row>
    </Header>
  );
};

export default HeaderApp;
