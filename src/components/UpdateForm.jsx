import React, { useState } from 'react';

const UpdateForm = ({ spotUpdate, setUpdateItem, updateItem, id, spot }) => {
  const [Inputvalue, setInputvalue] = useState('');
  return (
    <>
      <input
        value={Inputvalue}
        type='text'
        onChange={(e) => {
          setInputvalue(e.target.value);
          setUpdateItem(e.target.value);
        }}
      />
      <button
        type='submit'
        onClick={() => {
          spotUpdate(id);
          setInputvalue('');
        }}
      >
        編集
      </button>
    </>
  );
};
export default UpdateForm;
