import { useState, useContext } from 'react';
import { Button, Input, } from 'antd';

export default function HooksList() {
  const hookList = [
    {
      name: 'useCallback',
      decription: 'useCallback 缓存函数本身。不像 useMemo，它不会调用你传入的函数。相反，它缓存此函数。从而除非 productId 或 referrer 发生改变，handleSubmit 自己将不会发生改变。这让你向下传递 handleSubmit 函数而无需不必要地重新渲染 ShippingForm。直至用户提交表单，你的代码都将不会运行。',
      url: 'https://zh-hans.react.dev/reference/react/useCallback'
    },
    {
      name: 'useContext',
      decription: '组件中的 useContext() 调用不受 同一 组件返回的 provider 的影响。相应的 <Context.Provider> 需要位于调用 useContext() 的组件 之上。从 provider 接收到不同的 value 开始，React 自动重新渲染使用了该特定 context 的所有子级。先前的值和新的值会使用 Object.is 来做比较。使用 memo 来跳过重新渲染并不妨碍子级接收到新的 context 值。如果您的构建系统在输出中产生重复的模块（可能发生在符号链接中），这可能会破坏 context。通过 context 传递数据只有在用于传递 context 的 SomeContext 和用于读取数据的 SomeContext 是完全相同的对象时才有效，这是由 === 比较决定的。',
      url: 'https://zh-hans.react.dev/reference/react/useContext'
    },
    {
      name: 'useEffect',
      decription: `注意事项 
      useEffect 是一个 Hook，因此只能在 组件的顶层 或自己的 Hook 中调用它，而不能在循环或者条件内部调用。如果需要，抽离出一个新组件并将 state 移入其中。
      
      如果你 没有打算与某个外部系统同步，那么你可能不需要 Effect。
      
      当严格模式启动时，React 将在真正的 setup 函数首次运行前，运行一个开发模式下专有的额外 setup + cleanup 周期。这是一个压力测试，用于确保 cleanup 逻辑“映射”到了 setup 逻辑，并停止或撤消 setup 函数正在做的任何事情。如果这会导致一些问题，请实现 cleanup 函数。
      
      如果你的一些依赖项是组件内部定义的对象或函数，则存在这样的风险，即它们将 导致 Effect 过多地重新运行。要解决这个问题，请删除不必要的 对象 和 函数 依赖项。你还可以 抽离状态更新 和 非响应式的逻辑 到 Effect 之外。
      
      如果你的 Effect 不是由交互（比如点击）引起的，那么 React 会让浏览器 在运行 Effect 前先绘制出更新后的屏幕。如果你的 Effect 正在做一些视觉相关的事情（例如，定位一个 tooltip），并且有显著的延迟（例如，它会闪烁），那么将 useEffect 替换为 useLayoutEffect。
      
      如果你的 Effect 是由一个交互（比如点击）引起的，React 可能会在浏览器重新绘制屏幕之前执行 Effect。通常情况下，这样是符合预期的。但是，如果你必须要推迟 Effect 执行到浏览器绘制之后，和使用 alert() 类似，可以使用 setTimeout。有关更多信息，请参阅 reactwg/react-18/128。
      
      即使你的 Effect 是由一个交互（比如点击）引起的，React 也可能允许浏览器在处理 Effect 内部的状态更新之前重新绘制屏幕。通常，这样是符合预期的。但是，如果你一定要阻止浏览器重新绘制屏幕，则需要用 useLayoutEffect 替换 useEffect。
      
      Effect 只在客户端上运行，在服务端渲染中不会运行。`,
      url: 'https://zh-hans.react.dev/reference/react/useEffect'
    },
    {
      name: 'useMemo',
      decription: `是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。因为useMemo 是一个 React Hook，所以你只能 在组件的顶层 或者自定义 Hook 中调用它。你不能在循环语句或条件语句中调用它。如有需要，将其提取为一个新组件并使用 state。
      在严格模式下，为了 帮你发现意外的错误，React 将会 调用你的计算函数两次。这只是一个开发环境下的行为，并不会影响到生产环境。如果计算函数是一个纯函数（它本来就应该是），这将不会影响到代码逻辑。其中一次的调用结果将被忽略。
      除非有特定原因，React 不会丢弃缓存值。例如，在开发过程中，React 会在你编辑组件文件时丢弃缓存。无论是在开发环境还是在生产环境，如果你的组件在初始挂载期间被终止，React 都会丢弃缓存。在未来，React 可能会添加更多利用丢弃缓存的特性——例如，如果 React 在未来增加了对虚拟化列表的内置支持，那么丢弃那些滚出虚拟化列表视口的缓存是有意义的。你可以仅仅依赖 useMemo 作为性能优化手段。否则，使用 state 变量 或者 ref 可能更加合适。
      和 useCallback 不同的是，useMemo 缓存函数调用的结果。在这里，它缓存了调用 computeRequirements(product) 的结果。除非 product 发生改变，否则它将不会发生变化。这让你向下传递 requirements 时而无需不必要地重新渲染 ShippingForm。必要时，React 将会调用传入的函数重新计算结果。`,
      url: 'https://zh-hans.react.dev/reference/react/useMemo'
    }, 
    {
      name: 'useRef',
      decription: `它能帮助引用一个不需要渲染的值。
      useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。`,
      url: 'https://zh-hans.react.dev/reference/react/useRef'
    },
    {
      name: 'useState',
      decription: `const [state, setState] = useState(initialState) useState 返回一个由两个值组成的数组：
      当前的 state。在首次渲染时，它将与你传递的 initialState 相匹配。
      set 函数，它可以让你将 state 更新为不同的值并触发重新渲染。调用 set 函数 不会 改变已经执行的代码中当前的 state：它只影响 下一次 渲染中 useState 返回的内容。`,
      url: 'https://zh-hans.react.dev/reference/react/useState'
    },
  ];
  return (
    <ul>
      {hookList.map(hook => (
        <li className='hook-item' key={hook}>
          <span className='name'>{hook.name}</span>
          <span className='desciption'>{hook.decription}</span>
          <a className='link' href={hook.url} target='_blank' rel='noopener noreferrer'>文档</a>
        </li>
      ))}
    </ul>
  );
}
