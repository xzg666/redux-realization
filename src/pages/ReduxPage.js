import React, { Component } from "react";
import store from "../store";

export default class ReduxPage extends Component {

  //组件更新需要订阅
  componentDidMount(){
    //告诉redux，一旦state变化（执行dispatch函数），就执行的事件
    this.unsubscriber = store.subscribe(()=>{
      this.forceUpdate()
    })
  }

  //取消订阅
  componentWillUnmount(){
    this.unsubscriber()
  }

  add=()=>{
    store.dispatch({
      type:'ADD'
    })
    console.log('store',store.getState())
  }

  minus = () => {
    //发送请求再dispatch，类似于thunk
    store.dispatch((dispatch)=>{
      setTimeout(()=>{
        dispatch({type:'MINUS'})
      },500)
    })
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    );
  }
}
