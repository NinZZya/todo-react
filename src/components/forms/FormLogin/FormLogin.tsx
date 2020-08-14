import React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { userOperation } from '../../../reducer/user/user';
import * as userSelector from '../../../reducer/user/selectors';
import { UserStatus } from '../../../const';
import { IAppState, TAuthData } from '../../../types';
interface FormLoginProps {
  userStatus: string;
  login: (authData: TAuthData) => void;
}

const FormLogin: React.FC<FormLoginProps> = (props) => {
  const { userStatus, login } = props;

  if (userStatus === UserStatus.AUTH_ERROR) {
    message.error('Bad login or password');
  }

  if (userStatus === UserStatus.LOAD_ERROR) {
    message.error('Server error, try again later');
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

const mapStateToProps = (state: IAppState) => ({
  userStatus: userSelector.getUserStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  login(authData: TAuthData) {
    dispatch(userOperation.login(authData))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
