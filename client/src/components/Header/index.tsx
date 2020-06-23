import { Button, Classes, Navbar, NavbarGroup } from '@blueprintjs/core';
import { useStore } from '@fleur/react';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthStore } from '../../features/auth';

export const Header = () => {
  const loggedIn = useStore(getStore => getStore(AuthStore).state.loggedIn);
  const initialized = useStore(
    getStore => getStore(AuthStore).state.initialized,
  );
  const canAccessAdmin = useStore(getStore => {
    const state = getStore(AuthStore).state;
    return state.isAdmin || state.isEditor;
  });

  return (
    <Navbar className='bp3-dark' fixedToTop>
      <NavbarGroup align='left'>
        <Link
          to='/'
          className={clsx(
            Classes.BUTTON,
            Classes.MINIMAL,
            Classes.NAVBAR_HEADING,
          )}
        >
          イベント申し込み受付
        </Link>
      </NavbarGroup>
      <NavbarGroup align='right'>
        {initialized ? (
          <>
            {loggedIn && (
              <Link to='/my' className={clsx(Classes.BUTTON, Classes.MINIMAL)}>
                マイページ
              </Link>
            )}
            {canAccessAdmin && (
              <Link
                to='/admin'
                className={clsx(Classes.BUTTON, Classes.MINIMAL)}
              >
                管理
              </Link>
            )}
            {loggedIn ? (
              <Link
                to='/logout'
                className={clsx(Classes.BUTTON, Classes.MINIMAL)}
              >
                ログアウト
              </Link>
            ) : (
              <Link
                to='/login'
                className={clsx(Classes.BUTTON, Classes.MINIMAL)}
              >
                ログイン
              </Link>
            )}
          </>
        ) : (
          <Button text='ログイン' loading />
        )}
      </NavbarGroup>
    </Navbar>
  );
};
