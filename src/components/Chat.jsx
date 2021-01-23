import React, { useState, useEffect } from 'react';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';
import MessageInputField from './MessageInputField';
import MessageList from './MessageList';

const Chat = ({ history, location }) => {
  const [message, setMessage] = useState('');

  const db = firebase.firestore();
  const messages = db.collection('messages');
  const currentUser = location.state.name;

  const fetchMessages = () => {};

  useEffect(() => {
    fetchMessages();
  }, []);

  //追加
  const addMessage = () => {
    if (message === '') return;
    messages
      //一意なid付与
      .add({
        user: currentUser,
        message: message,
        createdAt: new Date(),
      })
      .then((docRef) => {
        console.log(docRef.id);
        fetchMessages();
        setMessage('');
      });
  };

  return (
    <div>
      <h1>Chat</h1>
      <h2>ようこそ{currentUser}</h2>

      <div>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addMessage();
          }}
        >
          追加
        </button>
      </div>

      {/* <MessageList /> */}
      <MessageInputField name={currentUser} />
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
