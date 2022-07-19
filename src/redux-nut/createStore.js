export default function createStore(reducer,enhancer){
  if(enhancer){
    //enhancer是加强dispatch可以处理函数
    return enhancer(createStore)(reducer)
  }

  let currentState
  let currentListeners = []

  function getState(){
    return currentState
  }

  function dispatch(action){
    //调用reducer，拿到最新值
    currentState = reducer(currentState,action)
    //dispatch触发订阅函数
    currentListeners.forEach(listerner=>listerner())
  }

  function subscribe(listerner){
    //加入订阅
    currentListeners.push(listerner)

    return ()=>{
      //取消订阅
      const index = currentListeners.indexOf(listerner)
      currentListeners.splice(index,1)
    }
  }

  //调用一次默认的action，拿到初始值
  dispatch({type:'default'})

  return {
    getState,
    dispatch,
    subscribe
  }
}
