import { useFleurContext, useStore } from '@fleur/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalContainer } from '../../components/Container';
import { Header } from '../../components/Header';
import { AuthOps, AuthStore } from '../../features/auth';
import { AdminEventList } from '../AdminEventList';
import { LoginView } from '../Login';
import { LoginCallbackView } from '../LoginCallback';

export const RootView = () => {
  const { executeOperation } = useFleurContext();
  const { isAdmin, isEditor } = useStore(getStore => {
    const { state } = getStore(AuthStore);

    return {
      isAdmin: state.isAdmin,
      isEditor: state.isEditor,
    };
  });

  React.useEffect(() => {
    executeOperation(AuthOps.startAuthMonitor);
  }, []);

  return (
    <>
      <Header />
      <GlobalContainer>
        <Switch>
          <Route path='/login' component={LoginView} exact />
          <Route path='/login/callback' component={LoginCallbackView} exact />
          {(isAdmin || isEditor) && (
            <Route path='/admin' exact component={AdminEventList} />
          )}
        </Switch>
      </GlobalContainer>
    </>
  );
};
