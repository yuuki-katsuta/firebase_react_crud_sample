import React, { useContext, useState } from 'react';
//ページ遷移をhandleで行う時にはwithRouterを使う
import { withRouter } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import TextInputField from './TextInputField';
import Button from '@material-ui/core/Button';

const Login = ({ history }) => {
  //レンダリングする関数はReact Routerのpropsを受け取る
  //historyはルーティングした過去の履歴情報

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // AuthContextからlogin関数を受け取る
  const { login } = useContext(AuthContext);
  const handleSubmit = () => {
    login(email, password, history);
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form>
        <TextInputField
          id={'standard-required'}
          label={'email'}
          name={'email'}
          type={'email'}
          placeholder={'Email'}
          value={email}
          setName={setEmail}
        />
        <TextInputField
          id={'standard-password-input'}
          label={'password'}
          name={'password'}
          type={'password'}
          placeholder={'Pasword'}
          value={password}
          setName={setPassword}
        />
        <div>
          <Button
            variant='outlined'
            style={{ margin: '16px 0' }}
            onClick={handleSubmit}
          >
            ログイン
          </Button>
        </div>
      </form>
      <Button
        onClick={() => {
          history.push('/signup');
        }}
      >
        サインインしてない場合クリック
      </Button>
    </div>
  );
};

export default withRouter(Login);
