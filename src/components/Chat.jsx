import React from 'react';
import 'firebase/firestore';
import { withRouter } from 'react-router';

const Chat = ({ history, location }) => {
  return (
    <div>
      <h1>Chat</h1>
      <h2>ようこそ{location.state.name}</h2>
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        戻る
      </button>
    </div>
  );
};
export default withRouter(Chat);
