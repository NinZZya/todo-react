import React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { Operation } from '../../../reducer/user/user';
import { getAuthorizationStatus } from '../../../reducer/user/selectors';
import { AuthorizationStatus } from '../../../const';
import { TAppState, TAuthData } from '../../../types';
interface TProps {
  authorizationStatus: string;
  login: (authData: TAuthData) => void;
}

const FormLogin = (props: TProps) => {
  const { authorizationStatus, login } = props;

  if (authorizationStatus === AuthorizationStatus.AUTH_ERROR) {
    message.error('Bad login or password');
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={(authData) => login({
        login: authData.login,
        password: authData.password,
      })}
      style={{ padding: '50px', border: '1px solid #d9d9d9' }}
    >
      <Form.Item
        name="login"
        rules={[{ required: true, message: 'Please input your Login!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          <LoginOutlined /> Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export { FormLogin };

const mapStateToProps = (state: TAppState) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<TAppState, void, Action>) => ({
  login(authData: TAuthData) {
    dispatch(Operation.login(authData))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
