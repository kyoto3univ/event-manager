import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalContainer } from '../../components/Container';
import { Header } from '../../components/Header';
import { LoginView } from '../Login';

export const RootView = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <GlobalContainer>
          <Switch>
            <Route path='/login' component={LoginView} exact />
          </Switch>
        </GlobalContainer>
      </>
    </BrowserRouter>
  );
};
