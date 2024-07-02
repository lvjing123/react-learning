import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';
import { Button, Input, } from 'antd';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <Input
        className='add-input'
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</Button>
    </>
  );
}

let nextId = 3;
