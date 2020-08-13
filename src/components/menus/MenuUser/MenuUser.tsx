import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { TUser, TAppState } from '../../../types';
import { ActionCreator as UserActionCreator } from '../../../reducer/user/user';
import { ActionCreator as BoardsActionCreator } from '../../../reducer/boards/boards';
import { ActionCreator as TasksActionCreator } from '../../../reducer/tasks/tasks';
import { getUser } from '../../../reducer/user/selectors';

interface TProps {
  user: TUser;
  reset: () => void;
};

const { SubMenu } = Menu;

const MenuUser: React.FC<TProps> = (props: TProps) => {
  const { user, reset } = props;

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      style={ {width: '150px'} }
    >
      <SubMenu
          key="sub1"
          title={
            <span>
              <UserOutlined />
              <span>{ user.login }</span>
            </span>
          }
        >
          <Menu.Item
            key="menu-item-log-out"
          >
            <a href="/"
              onClick={() => reset()}
            >
              <LogoutOutlined />
              Log out...
            </a>
          </Menu.Item>
        </SubMenu>
    </Menu>
  );
};

export { MenuUser };

const mapStateToProps = (state: TAppState) => {
  return {
    user: getUser(state),
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    reset() {
      dispatch(TasksActionCreator.resetTasks());
      dispatch(BoardsActionCreator.resetBoards());
      dispatch(UserActionCreator.resetUser());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuUser);
