import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Login from './Login';

//プライベートルート
const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  //...optionsでレスとパラメータ（残余引数）をまとめて受け取っている
  //AuthContextから現在のユーザーのログイン状態を取得
  const { currentUser } = useContext(AuthContext);
  //currentUserがセットされていればアクセスを許可し、セットされていない(null)の場合はLoginページに移動
  const Component = currentUser ? RouteComponent : Login;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
