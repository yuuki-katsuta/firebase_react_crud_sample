import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
      console.log('firestoreからデータを受け取る');
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
        console.log('firestoreにデータを渡す');
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
      <div>
        <TextField
          id='standard-basic'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Fab
          style={{ verticalAlign: 'bottom' }}
          color='primary'
          aria-label='add'
          size='small'
          onClick={() => addTodo()}
        >
          <AddIcon />
        </Fab>
      </div>
      <div style={{ marginTop: '40px' }}>
        <div>
          {todoList.map((todo, idx) => (
            <div key={idx}>
              <List component='nav' aria-label='main mailbox folders'>
                <ListItem button>
                  <ListItemText primary={todo} />
                  <IconButton
                    aria-label='delete'
                    onClick={() => deleteTodo(idx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </List>
            </div>
          ))}
        </div>
      </div>
      <Button
        style={{ marginTop: '20px' }}
        color='primary'
        onClick={() => {
          auth.signOut();
          //signOut()でログアウトを行う
        }}
      >
        サインアウト
      </Button>
    </div>
  );
};
export default Home;
