import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { IUser, IAppState } from '../../../../types';
import { userActionCreator } from '../../../../reducer/user/user';
import { boardsActionCreator } from '../../../../reducer/boards/boards';
import { tasksActionCreator } from '../../../../reducer/tasks/tasks';
import { getUser } from '../../../../reducer/user/selectors';

interface MenuUserProps {
  user: IUser | null;
  resetUser: () => void;
  resetBoards: () => void;
  resetTasks: () => void;
};

const { SubMenu } = Menu;

const MenuUser: React.FC<MenuUserProps> = (props) => {
  const { user, resetUser, resetBoards, resetTasks } = props;

  if (user === null) {
    return null;
  }

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      style={ {width: '150px'} }
    >
      <SubMenu
          key="menu-user"
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
              onClick={() => {
                resetTasks();
                resetBoards();
                resetUser();
              }}
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

const mapStateToProps = (state: IAppState) => {
  return {
    user: getUser(state),
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    resetUser() {
      dispatch(userActionCreator.resetUser());
    },
    resetBoards() {
      dispatch(boardsActionCreator.resetBoards());
    },
    resetTasks() {
      dispatch(tasksActionCreator.resetTasks());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuUser);
