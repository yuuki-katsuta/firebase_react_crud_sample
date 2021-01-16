import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const TodoList = ({ todoList, deleteTodo }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <div>
        {todoList.map((todo, idx) => (
          <div key={idx}>
            <List component='nav' aria-label='main mailbox folders'>
              <ListItem button>
                <ListItemText primary={todo} />
                <IconButton aria-label='delete' onClick={() => deleteTodo(idx)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </List>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TodoList;
