import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';
import { Button, Input, } from 'antd';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <Input
          className='task-item-input'
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <Button onClick={() => setIsEditing(false)}>
          Save
        </Button>
      </>
    );
  } else {
    taskContent = (
      <>
        <span className='text-field'>{task.text}</span>
        <Button onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </>
    );
  }
  return (
    <div className='task-item'>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
        className="check-box"
      />
      {taskContent}
      <Button className='delete-btn' onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </Button>
    </div>
  );
}