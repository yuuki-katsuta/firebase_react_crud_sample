import React from 'react';
import { auth } from '../base';

const Home = () => {
  return (
    <div>
      <h2>Home page</h2>
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
