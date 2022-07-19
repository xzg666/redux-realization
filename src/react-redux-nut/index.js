//context传值 跨组件层级传值

import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  createContext,
  useState,
  useCallback,
  useSyncExternalStore
} from "react";
import { bindActionCreators } from "../redux-nut";

//1.创建context对象
const Context = createContext()

//2.Provider组件传递value（store）
export function Provider({store,children}){
  return <Context.Provider value={store}>{children}</Context.Provider>
}

//3.后代消费Provider传递下来的value
//contextype 类组件，只能订阅单一的context来源
//useContext 只能使用在函数组件或者自定义hook中
//Consumer 没有组件限制，注意使用方式

export const connect =
  (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => (props) =>{
    const store = useContext(Context)
    const {getState,dispatch,subscribe} = store

    // const stateProps = mapStateToProps(getState())
    let dispatchProps = {dispatch}
    //如果是函数
    if(typeof mapDispatchToProps === 'function'){
      dispatchProps = mapDispatchToProps(dispatch)
    }else if(typeof mapDispatchToProps === 'object'){
      dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
    }

    const [,forceUpdate] = useReducer((x) => x+1 ,0)
    // const forceUpdate = useForceUpdate()

    //订阅更新组件
    //组件的订阅一般都是useLayoutEffect,使用useEffect的话可能更新中渲染之前更新，从而没有渲染
    // useLayoutEffect(() => {
    //    const unsubscriibe = subscribe(()=>{
    //     forceUpdate()
    //    })

    //   return () => {
    //     unsubscriibe()
    //   };

    const state = useSyncExternalStore(() => {
      subscribe(forceUpdate);
    }, getState);

    const stateProps = mapStateToProps(state)


    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
  }


  function useForceUpdate(){
    const [,setState] = useState(0)
    const update = useCallback(()=>{
      setState(prev => prev+1)
    },[])//防止组件将这个函数当作参数传递，可能会导致组件意外更新，因此加缓存
    return update
  }


  export function useSelector(selector){
    const store = useContext(Context)

    const {getState,subscribe} = store
    // const selectedState = selector(getState())
    const forceUpdate = useForceUpdate()
    //订阅
  //   useLayoutEffect(() => {
  //     const unsubscriibe = subscribe(()=>{
  //      forceUpdate()
  //     })

  //    return () => {
  //      unsubscriibe()
  //    };
  //  }, [subscribe])

  const state = useSyncExternalStore(() => {
    subscribe(forceUpdate);
  }, getState);

  const selectedState = selector(state);

   return selectedState

  }

  export function useDispatch(){
    const store = useContext(Context)
    const {dispatch} = store
    return dispatch
  }
