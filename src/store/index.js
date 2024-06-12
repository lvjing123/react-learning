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