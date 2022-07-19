// import {createStore,applyMiddleware} from 'redux'
// import { combineReducers } from 'redux';
import { combineReducers } from '../redux-nut';
import {createStore,applyMiddleware} from '../redux-nut'

// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

export function countReducer(state=0,action){
  switch(action.type){
    case 'ADD':
      return state+1;
    case 'MINUS':
      return state-1;
    default:
      return state;
  }
}


//创建store {count:0,user:''}
const store = createStore(combineReducers({
  count:countReducer
  // user:userReducer
}),applyMiddleware(thunk,logger))

export default store


//实现中间件
function logger({getState,dispatch}){
  return (next)=>(action)=>{
    console.log('----------------')
    console.log(action.type + '执行了')
    const preState = getState()
    console.log('prev state',preState)

    const returnValue = next(action)
    //等状态值修改了之后，在执行getState,拿到新的状态值
    const nextState = getState()
    console.log('next state',nextState)
    console.log('----------------')
    return returnValue//上一个中间件的返回值是下一个的参数
  }
}

function thunk({getState,dispatch}){
  return (next) => (action)=>{
    if(typeof action === 'function'){
      return action(dispatch,getState)
    }
    return next(action)
  }
}
