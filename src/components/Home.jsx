import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [input, setInput] = useState('');
  //未完了タスク
  const [todoList, setTodoList] = useState([]);
  //完了タスク
  const [finishedTodo, setIsFinishedTodo] = useState([]);
  //未完了タスクが変化したか監視
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  //完了タスクが変化したか監視
  const [isChangedFinished, setIsChangedFinished] = useState(false);

  //Cloud Firestore を初期化する
  const db = firebase.firestore();

  //firestoreからデータを受け取る
  useEffect(() => {
    (async () => {
      //"get" メソッドを使用してコレクション全体を取得
      const resTodo = await db.collection('todoList').doc('todo').get();
      //ドキュメントデータは、resTodo.data()で受け取れる
      setTodoList(resTodo.data().tasks);

      const resFinishedTodo = await db
        .collection('todoList')
        .doc('finishedTodo')
        .get();
      //ドキュメントデータは、resTodo.data()で受け取れる
      setIsFinishedTodo(resFinishedTodo.data().tasks);
    })();
  }, [db]);

  //firestoreにデータを渡す（未完了）
  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        //console.log('発火');
        const docRef = await db.collection('todoList').doc('todo');
        docRef.update({ tasks: todoList });
      })();
    }
  }, [todoList, isChangedTodo, db]);

  //firestoreにデータを渡す（完了）
  useEffect(() => {
    if (isChangedFinished) {
      (async () => {
        console.log('発火');
        const docRef = await db.collection('todoList').doc('finishedTodo');
        docRef.update({ tasks: finishedTodo });
      })();
    }
  }, [finishedTodo, isChangedFinished, db]);

  //input送信時
  const addTodo = async () => {
    //Todoが変化したのでtrue
    setIsChangedTodo(true);
    setTodoList([...todoList, input]);
    setInput('');
  };

  //未完了タスクをdelete
  const deleteTodo = (index) => {
    //Todoが変化したのでtrue
    setIsChangedFinished(true);
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  //完了タスクをdelete
  const deleteFinishTodo = (index) => {
    // 追記 完了済みTodoが変化したのでtrue
    setIsChangedFinished(true);
    setIsFinishedTodo(finishedTodo.filter((_, idx) => idx !== index));
  };

  //未完了→完了 処理
  const finishTodo = (index) => {
    //完了、未完了どちらも変化する
    setIsChangedTodo(true);
    setIsChangedFinished(true);
    deleteTodo(index);
    //完了リストへ追加処理
    setIsFinishedTodo([
      ...finishedTodo,
      //完了から選択したタスクを追加
      todoList.find((_, idx) => idx === index),
    ]);
  };

  //完了→未完了 処理
  const reopenTodo = (index) => {
    //完了、未完了どちらも変化する
    setIsChangedTodo(true);
    setIsChangedFinished(true);
    deleteFinishTodo(index);
    setTodoList([...todoList, finishedTodo.find((_, idx) => idx === index)]);
  };

  return (
    <div>
      <h1>ようこそ {currentUser.displayName} !!</h1>
      <h3>{currentUser.displayName}のやること</h3>

      <input onChange={(e) => setInput(e.target.value)} value={input} />
      <button onClick={() => addTodo()}>追加</button>

      <div>
        <h2>未完了</h2>
        <div>
          {todoList.map((todo, idx) => (
            <div key={idx}>
              {todo}
              <button onClick={() => deleteTodo(idx)}>削除</button>
              <button onClick={() => finishTodo(idx)}>完了済</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>完了</h2>
        {finishedTodo.map((todo, idx) => (
          <div key={idx}>
            {todo}
            <button onClick={() => deleteTodo(idx)}>削除</button>
            <button onClick={() => reopenTodo(idx)}>戻す</button>
          </div>
        ))}
      </div>

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
