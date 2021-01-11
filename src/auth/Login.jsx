import React, { useContext } from 'react';
//ページ遷移をhandleで行う時にはwithRouterを使う
import { withRouter } from 'react-router';
import { AuthContext } from './AuthProvider';

const Login = ({ history }) => {
  //レンダリングする関数はReact Routerのpropsを受け取る
  //historyはルーティングした過去の履歴情報

  const { login } = useContext(AuthContext);

  //// AuthContextからlogin関数を受け取る
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name='email' type='email' placeholder='Email' />
        </label>
        <label>
          Password
          <input name='password' type='password' placeholder='Password' />
        </label>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

//ページ遷移をhandleで行う時にはwithRouterを使う
export default withRouter(Login);
