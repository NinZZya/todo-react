import React from 'react';
import { Layout } from 'antd';
import MenuUser from '../menus/MenuUser';


const { Header } = Layout;



const HeaderApp = () => {

  return (
    <Header>
      <MenuUser />
    </Header>
  );
};

export default HeaderApp;
