import { FleurContext } from '@fleur/react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalContainer } from '../../components/Container';
import { Header } from '../../components/Header';
import { AuthOps } from '../../features/auth';
import { store } from '../../store';
import { LoginView } from '../Login';
import { LoginCallbackView } from '../LoginCallback';

export const RootView = () => {
  React.useEffect(() => {
    store.executeOperation(AuthOps.startAuthMonitor);
  }, []);

  return (
    <FleurContext value={store}>
      <BrowserRouter>
        <>
          <Header />
          <GlobalContainer>
            <Switch>
              <Route path='/login' component={LoginView} exact />
              <Route
                path='/login/callback'
                component={LoginCallbackView}
                exact
              />
            </Switch>
          </GlobalContainer>
        </>
      </BrowserRouter>
    </FleurContext>
  );
};
