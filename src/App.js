import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import styled from 'styled-components';

const Main = styled.main`
  text-align: center;
  margin: 80px auto 0;
`;

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Main>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};
//ルート階層でコンポーネント全体をBrowserRouterで囲うことで、画面遷移時にヒストリーAPIに履歴情報を追加してくれる

export default App;
