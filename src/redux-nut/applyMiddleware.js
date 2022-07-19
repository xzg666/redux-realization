import  compose  from "./compose"

//applyMiddleware是个enhancer加强dispatch
export default function applyMiddleware(...middlewares){
  return (createStore)=>(reducer)=>{
    const store = createStore(reducer)
    let dispatch = store.dispatch

    //todo加强dispatch
    const midApi = {
      getState:store.getState,
      dispatch: (action,...args)=>dispatch(action,...args)//执行的时候是当前上下文的dispatch
    }

    //调用每一个中间件得到一个数组（middleware拿到权限）
    const middlewareChain = middlewares.map(middleware=>middleware(midApi))

    //加强版dispatch
    //把所有中间件的函数都执行了，同时还执行store.dispatch
    //最终还需要执行dipatch修改状态值吧
    dispatch = compose(...middlewareChain)(store.dispatch)


    return{
      ...store,
      dispatch//加强版的dispatch
    }
  }
}


