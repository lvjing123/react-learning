// 该组件是为了路由跳转而实用的，
// 路由跳转，可以使用link 也可以用 useNavigate.  
// 后者只能在函数式组件中使用
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// useSelector 是函数式组件，取值的方法，
// useSelector 是 React-Redux 中用于连接 Redux store 和 React 组件的一个 Hook。在 class 组件中，我们通常不直接使用 useSelector，因为 class 组件是基于 React 的旧版生命周期方法编写的，而 Hook 是为函数组件设计的。然而，如果你确实需要在 class 组件中访问 Redux store 中的数据，你可以通过 connect 方法或者使用 react-redux 提供的 Provider 和 connect 函数来实现。
// 在 class 组件中，通常不推荐直接使用 useSelector。相反，你应该使用 react-redux 的 connect 方法来连接 Redux store。这样，你可以将 store 中的状态映射到组件的 props 中。
// connect 是类组件取值的方法,类似于promanage 中的写法
// 也就是没办法绑定在store 中了
function WithRouter(WrapperComponent) {
    function EnhanceComponent(props) {
        // 在函数组件中，调用 useNavigate hook 将结果作为props 传入
        const navigate = useNavigate()
        const dispatch = useDispatch()
        // 用于路由跳转
        const router = { navigate }
        // 用于仓库存储值 和 取出值
        const store =  { dispatch }
        return <WrapperComponent {...props} router={router} store={store} />
    }  
    return  EnhanceComponent
}

export default WithRouter
