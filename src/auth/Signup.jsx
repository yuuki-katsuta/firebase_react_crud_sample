import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router';
import { AuthContext } from './AuthProvider';
import TextField from '@material-ui/core/TextField';
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
        <div style={{ margin: '16px 0' }}>
          <TextField
            id='standard-name-required'
            label='name'
            name='name'
            type='name'
            placeholder='Name'
            fullWidth
            size='medium'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={{ margin: '16px 0' }}>
          <TextField
            id='standard-required'
            label='e-mail'
            name='email'
            type='email'
            placeholder='Email'
            fullWidth
            size='medium'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div style={{ margin: '16px 0' }}>
          <TextField
            id='standard-password-input'
            label='Password'
            type='password'
            name='password'
            placeholder='Password'
            fullWidth
            size='medium'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
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
