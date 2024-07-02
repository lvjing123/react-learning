import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';
import './Tasks.scss';
import HooksList from './HooksList.js';

export default () => {
  return (
    <div className="page-container">
      <TasksProvider>
        <h1>context and reducer demo</h1>
        <AddTask />
        <TaskList />
      </TasksProvider>

      <h1>react hook</h1>
      <HooksList />
    </div>
  );
}