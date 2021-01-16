import React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const TodoInputField = ({ addTodo, setInput, input }) => {
  return (
    <div>
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
    </div>
  );
};
export default TodoInputField;
