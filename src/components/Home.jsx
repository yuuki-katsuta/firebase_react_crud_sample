import React, { useContext, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = () => {
    setTodoList([...todoList, input]);
    setInput('');
  };

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };
  return (
    <div>
      <h1>Home page</h1>
      <h2>ようこそ {currentUser.displayName} !!</h2>
      <h2>idは {currentUser.uid}</h2>
      <div className='App'>
        <input onChange={(e) => setInput(e.target.value)} value={input} />
        <button onClick={() => addTodo()}>追加</button>
        <div>
          {todoList.map((todo, idx) => (
            <div key={idx}>
              {todo}
              <button onClick={() => deleteTodo(idx)}>削除</button>
            </div>
          ))}
        </div>
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
