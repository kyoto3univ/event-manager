import {
  Button,
  Callout,
  Classes,
  FormGroup,
  H2,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import { useFleurContext, useStore } from '@fleur/react';
import React from 'react';
import useRouter from 'use-react-router';
import { LoginContainer } from '../../components/Container';
import { AuthOps, AuthStore } from '../../features/auth';

export const LoginView = () => {
  const [email, setEmail] = React.useState('');
  const { executeOperation } = useFleurContext();
  const { history } = useRouter();
  const authStore = useStore(store => store(AuthStore).state);

  const handleLoginButtonClick = React.useCallback(() => {
    executeOperation(AuthOps.startEmailLogin, email);
  }, [executeOperation, email]);

  const handleEmailTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  React.useEffect(() => {
    if (authStore.loggedIn) {
      history.push('/');
    }
  }, [authStore.loggedIn]);

  return (
    <LoginContainer>
      <H2 className='bp3-heading'>ログイン・登録</H2>
      <p className={Classes.UI_TEXT}>
        メールアドレスを入力すると認証用URLが送信されます．
        認証用URLをクリックすることでログインが完了します．
        ログイン後，登録したイベントの情報を確認したり，登録内容を変更することができます．
      </p>
      <FormGroup label='メールアドレス'>
        <InputGroup
          placeholder='xxxxxxxx@edu.kit.ac.jp'
          type='email'
          large
          onChange={handleEmailTextChange}
          disabled={
            !authStore.initialized ||
            authStore.emailSending ||
            authStore.emailSent
          }
        />
      </FormGroup>
      {authStore.emailSent ? (
        <Callout title='メール送信完了' intent={Intent.SUCCESS}>
          {`メールボックスを確認してください．このページは閉じても問題ありません．`}
        </Callout>
      ) : (
        <Button
          large
          intent={Intent.PRIMARY}
          onClick={handleLoginButtonClick}
          disabled={!authStore.initialized || authStore.emailSending}
          loading={authStore.emailSending}
        >
          続行
        </Button>
      )}
    </LoginContainer>
  );
};
