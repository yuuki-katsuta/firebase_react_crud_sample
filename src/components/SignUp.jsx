import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import TextInputField from './TextInputField';
import Button from '@material-ui/core/Button';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useContext(AuthContext);
  // AuthContextからsignup関数を受け取る
  const handleSubmit = () => {
    signup(email, password, name, history);
  };

  return (
    <div>
      <h1>サインイン</h1>
      <form>
        <TextInputField
          id={'standard-name-required'}
          label={'name'}
          name={'name'}
          type={'name'}
          placeholder={'Name'}
          value={name}
          setName={setName}
        />
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
            サインイン
          </Button>
        </div>
      </form>
      <Button
        onClick={() => {
          history.push('/login');
        }}
      >
        サインイン済みの場合クリック
      </Button>
    </div>
  );
};

export default withRouter(SignUp);
