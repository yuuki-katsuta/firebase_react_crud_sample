import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { withRouter } from 'react-router';

const Chat = ({ history, match }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const db = firebase.firestore();
  const Messages = db.collection('messages');
  //console.log(match.params.id);

  //データ取得
  const fetchMessages = () => {
    const a = Messages.orderBy('createdAt', 'desc')
      //最後から10件取得
      .limit(10)
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            const data = doc.data();
            msg.push({
              message: data.message,
              name: data.user,
            });
          }
        });
        //配列の順番を入れ替える
        return msg.reverse();
      });
    return a;
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      //非同期でデータを取得
      const result = await fetchMessages();
      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setMessages(result);
      }
    })();
    //副作用フックが返す「クリーンアップ関数」で true に更新されている。
    //非同期処理が完了する前にコンポーネントがアンマウントされると、ステートは更新されない
    return () => {
      unmounted = true;
    };
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
      .then(async () => {
        const result = await fetchMessages();
        setMessages(result);
        setMessage('');
      });
  };

  return (
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
        {messages && (
          <div>
            {messages.map((data, index) => {
              return <div key={index}>{data.message}</div>;
            })}
          </div>
        )}
      </div>
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
