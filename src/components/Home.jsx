import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';
import TodoList from './TodoList';
import TodoInputField from './TodoInputField';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [input, setInput] = useState('');
  //タスク
  const [todoList, setTodoList] = useState([]);
  //タスクが変化したか監視
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  //Cloud Firestore を初期化する
  const db = firebase.firestore();

  //firestoreからデータを受け取る
  useEffect(() => {
    (async () => {
      //"get" メソッドを使用してコレクション全体を取得
      const resTodo = await db
        .collection('todoList')
        .doc(currentUser.uid)
        .get();
      //ドキュメントデータは、resTodo.data()で受け取れる
      if (resTodo.data()) {
        setTodoList(resTodo.data().tasks);
      }
    })();
  }, [db, currentUser]);

  //firestoreにデータを渡す（未完了）
  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        await db.collection('todoList').doc(currentUser.uid).set({
          tasks: todoList,
        });
      })();
    }
  }, [todoList, isChangedTodo, db, currentUser]);

  //input送信時
  const addTodo = async () => {
    if (input === '') {
      alert('Please fill in the blanks');
      return;
    }
    setIsChangedTodo(true);
    setTodoList([...todoList, input]);
    setInput('');
  };

  //未完了タスクをdelete
  const deleteTodo = (index) => {
    setIsChangedTodo(true);
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h1>ようこそ {currentUser.displayName} !!</h1>
      <h3>{currentUser.displayName}のやること</h3>
      <TodoInputField addTodo={addTodo} setInput={setInput} input={input} />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} />
      <Button
        style={{ margin: '20px 0' }}
        color='primary'
        onClick={() => {
          auth.signOut();
        }}
      >
        ログアウト
      </Button>
    </div>
  );
};
export default Home;
