import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';
import './Tasks.scss';
import HooksList from './HooksList.js';
import MultiCheck from './MultiCheck.js';

export default () => {
  const [options, setOptions] = useState([
    { label: "aaa", value: '1' },
    { label: "bbb", value: '2' },
    { label: "ccc", value: '3' }])
  const values = ['1', '2']
  const addOptions = () => {
    const index = options.length + 1
    setOptions([...options, { label: `ddd-${index}`, value: index.toString() }])
  }
  return (
    <div className="page-container">
      <TasksProvider>
        <h1>context and reducer demo</h1>
        <AddTask />
        <TaskList />
      </TasksProvider>

      <h1>react hook</h1>
      {/* <HooksList /> */}
      <h1> MultiCheck demo for use hooks</h1>
      <button onClick={addOptions}>add options</button>
      <MultiCheck options={options} values={values} />
    </div>
  );
}