export default function combineReducers(reducers){
  //返回一个总的reducer (prestate,action)=>nextstate
  return function combination(state={},action){
    let nextState = {}
    let hasChange = false;
    for (const key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key],action)
      hasChange = hasChange || nextState[key] !== state[key]//判断前后值是否相同
    }

    //新旧state对比长度，判断是否改变则重新执行reducer
    hasChange =
    hasChange || (Object.keys(nextState).length !== Object.keys(state).length)
    return hasChange ? nextState : state;
  }
}
