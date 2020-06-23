import { Callout, Classes, H2, Intent, ProgressBar } from '@blueprintjs/core';
import { useFleurContext, useStore } from '@fleur/react';
import React from 'react';
import useRouter from 'use-react-router';
import { LoginContainer } from '../../components/Container';
import { AuthOps, AuthStore } from '../../features/auth';

export const LoginCallbackView = () => {
  const { history } = useRouter();
  const { executeOperation } = useFleurContext();
  const authStore = useStore(getStore => getStore(AuthStore).state);

  React.useEffect(() => {
    executeOperation(AuthOps.finalizeEmailLogin, location.href); //TODO
  }, []);

  React.useEffect(() => {
    if (authStore.callbackProceeded) {
      if (!authStore.callbackInvalid && authStore.loggedIn) {
        history.push('/');
      }
    }
  }, [
    authStore.callbackProceeded,
    authStore.loggedIn,
    authStore.callbackInvalid,
  ]);

  return (
    <LoginContainer>
      {authStore.callbackProceeded || (
        <>
          <H2 className={Classes.HEADING}>ログイン中</H2>
          <ProgressBar intent={Intent.PRIMARY} />
        </>
      )}
      {authStore.callbackInvalid && (
        <Callout intent={Intent.DANGER} title='ログインエラー'>
          {`ログインリンクが有効期限切れです．再度ログイン処理を行ってください．`}
        </Callout>
      )}
    </LoginContainer>
  );
};
