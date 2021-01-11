import React, { useContext } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Home page</h1>
      <h2>ようこそ {currentUser.displayName}</h2>
      <button
        onClick={() => {
          auth.signOut();
          //signOut()でログアウトを行う
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
export default Home;
