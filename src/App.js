import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import Home from './components/Home';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};
//ルート階層でコンポーネント全体をBrowserRouterで囲うことで、画面遷移時にヒストリーAPIに履歴情報を追加してくれる

export default App;
