import React from 'react';
import { Layout, Row, Col } from 'antd';
import FormLogin from '../../components/forms/FormLogin';

const { Content } = Layout;

const Login = () => {
  return (
    <Content style={{ padding: '50px' }}>
      <Row gutter={[8, 8]} justify="center" align="middle">
        <Col span={12}>
          <div style={{padding: '50px'}}>
            <p style={{ textAlign: 'center' }}>
              <b>TEST DATA</b>
            </p>
            <ul>
              <li>
                <p><b>Login:</b> test</p>
              </li>
              <li>
                <p><b>Password:</b> test</p>
              </li>
            </ul>
          </div>
        </Col>
        <Col span={12} style={{padding: '20px'}}>
          <FormLogin />
        </Col>
      </Row>
    </Content>
  );
};

export default Login;
