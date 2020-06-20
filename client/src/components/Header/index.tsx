import { Button, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import React from 'react';

export const Header = () => {
  return (
    <Navbar className='bp3-dark' fixedToTop>
      <NavbarGroup align='left'>
        <NavbarHeading>イベント申し込み受付</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align='right'>
        <Button text='管理' minimal />
        <Button text='ログイン' minimal />
      </NavbarGroup>
    </Navbar>
  );
};
