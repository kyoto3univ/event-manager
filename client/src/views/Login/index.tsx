import {
  Button,
  Classes,
  FormGroup,
  H2,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import React from 'react';
import { LoginContainer } from '../../components/Container';

export const LoginView = () => {
  return (
    <LoginContainer>
      <H2 className='bp3-heading'>ログイン・登録</H2>
      <p className={Classes.UI_TEXT}>
        メールアドレスを入力すると認証用URLが送信されます．
        認証用URLをクリックすることでログインが完了します．
        ログイン後，登録したイベントの情報を確認したり，登録内容を変更することができます．
      </p>
      <FormGroup label='メールアドレス'>
        <InputGroup placeholder='xxxxxxxx@edu.kit.ac.jp' type='email' large />
      </FormGroup>
      <Button large intent={Intent.PRIMARY}>
        続行
      </Button>
    </LoginContainer>
  );
};
