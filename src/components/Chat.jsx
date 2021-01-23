import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';

const Chat = ({ history }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const db = firebase.firestore();
  const Messages = db.collection('messages');
  const { currentUser } = useContext(AuthContext);

  //データ取得
  const fetchMessages = () => {
    Messages.orderBy('createdAt', 'desc')
      //最後から10件取得
      .limit(10)
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          msg.push({
            message: data.message,
            name: data.user,
          });
        });
        //配列の順番を入れ替える
        msg.reverse();
        setMessages(msg);
      });
  };

  useEffect(() => {
    fetchMessages();
    //eslint-disable-next-line
  }, []);

  //追加
  const addMessage = () => {
    if (message === '') return;
    Messages
      //一意なid付与
      .add({
        user: currentUser.displayName,
        message: message,
        createdAt: new Date(),
      })
      .then((docRef) => {
        console.log(docRef.id);
        fetchMessages();
        setMessage('');
      });
  };

  return currentUser ? (
    <div>
      <h1>Chat</h1>
      <h2>ようこそ</h2>

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
      <div>
        {messages.map((data, index) => {
          return <div key={index}>{data.message}</div>;
        })}
      </div>

      {/* <MessageList /> */}
      {/* <MessageInputField name={currentUser.displayName} /> */}
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        戻る
      </button>
    </div>
  ) : (
    <div>
      <CircularProgress />
    </div>
  );
};
export default withRouter(Chat);
