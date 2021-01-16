import React, { useEffect, useState } from 'react';
import { auth } from '../base.js';

// contextオブジェクトの作成
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //currentUserは現在ログインしているユーザーの状態を表す
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ユーザーをログインさせる関数
  const login = async (email, password, history) => {
    try {
      //メールアドレスとパスワードを使用してユーザーのログインを行う
      await auth.signInWithEmailAndPassword(email, password);
      //Routerに紐づけられたコンポーネントには、historyというプロパティが自動的に付与され,pushメソッドで遷移を行う
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (email, password, name, history) => {
    try {
      if (name === '') {
        alert('Name is Not entered');
        return;
      }
      //新しいユーザーを登録する
      await auth.createUserWithEmailAndPassword(email, password);
      var user = auth.currentUser;
      //updateProfileでuserのプロフィールを更新
      await user.updateProfile({
        //ユーザーネームを設定
        displayName: name,
      });
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    //認証状態オブザーバーを設定し、ユーザーデータを取得する
    //firebase.auth().onAuthStateChanged 関数で、認証状態の変化を監視します。認証されていれば user オブジェクトに値が設定され、未認証であれば、null が設定される
    //ログイン状態が変化すると呼び出される
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    // コンテキストの適用範囲をきめる
    // AuthProviderのchildren内で認証ロジックが使える
    <AuthContext.Provider
      //valueプロパティで実際に渡すデータを指定
      value={{
        login: login,
        signup: signup,
        currentUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
