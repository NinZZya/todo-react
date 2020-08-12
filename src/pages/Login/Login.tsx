import React from 'react';
import { Row, Col } from 'antd';
import FormLogin from '../../components/forms/FormLogin';


const Login = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <FormLogin />
      </Col>
      <Col span={12} />
    </Row>
  );
};

export default Login;
