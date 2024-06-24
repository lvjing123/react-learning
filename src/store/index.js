/**
 * Created by djz on 2023/3/27.
 */
// 主要是store 仓库
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginReducer'
import commonReducer from './commonReducer'
import dragReducer from './dragReducer'

// 这里可以用多个仓库
// reducer 的 key值 要与 每个分reducer 保持一致
// 例如 login 就要与 loginReducer 中的 name 保持一致，
// 采用 useSelector 取login 中的相关信息的时候  采用如下方法
// const loginInfo = useSelector((state) => state.login)

export default configureStore({
  reducer: {
    login: loginReducer,
    common: commonReducer,
    drag: dragReducer
  }
})


/*
比较老的写法
state 全局唯一数据源，不可直接修改,，通过ation 修改
1: action.js
action type
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
action creators

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    index
  }
}
2: react-redux
定义一个 todoApp, 管理应用全局state 的 reducer
function todoApp(state= {}, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: state.todos.concat([action.text])
      })
    case 'TOGGLE_TODO':
      return Object.assign({}, state, newState)
    default:
      state
    })
  }
}

当需要多个reduder
function todos(state=[], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: state.todos.concat([action.text])
      })
    case 'TOGGLE_TODO':
      return Object.assign({}, state, newState)
    default:
      state
    })
  }
}

function visibilityFilter(state=[], action) {
  switch (action.type) {
    case 'aaa':
      return xxx
    default:
      state
    })
  }
}

把多个reducer 用 combineReducers 合并
const todoApp = combineReducers({
  todos,
  visibilityFilter
})


3: store 和 react 组件，需要connet 函数链接
例如组件好似 TodoList
import TodoList from './TodoList'
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps
  mapDispatchToProps
)(TodoList)

mapStateToProps和mapDispatchToProps的类型都是函数，
前者负责从全局应用状态state中取出所需数据，映射到展示组件的props，
后者负责把需要用到的action映射到展示组件的props上。

function getVisibleTodos(todo, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todo
    case 'SHOW_COMPLETED':
      return todo.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todo.filter(t => !t.completed)
  }
}
function mapStateToProps(state
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter) 
  }
}
每当store中的state更新时，mapStateToProps就会重新执行，重新计算传递给展示组件的props，从而触发组件的重新渲染。
容器组件除了可以从state中读取数据外，还可以发送action更新state，
这就依赖于connect的第二个参数mapDispatchToProps。mapDispatchToProps接收store.dispatch方法作为参数，
返回展示组件用来修改state的函数，例如
function toggleTodo(index) {
  return {
    type: 'TOGGLE_TODO',
    index
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: index => {
      dispatch(toggleTodo(index))
    }
  }
}
这样，展示组件内就可以调用this.props.onTodoClick(id)发送修改待办事项状态的action了。
另外，与mapStateToProps相同，mapDispatchToProps也支持第二个参数，代表容器组件的props。
*/ 
