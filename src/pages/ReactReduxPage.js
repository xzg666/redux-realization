import { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "../react-redux-nut";
// import { bindActionCreators } from "redux";
import { bindActionCreators } from "../redux-nut";

export default connect(
  //mapStateToProps
  ({count})=>({count}),//一般解构
  //mapDispatchToProps
  //写法一：obj
  // {
  //   add:()=>({type:'ADD'}),
  //   minus:()=>({type:'MINUS'})
  // }
  //写法二：function
  // (dispatch) => {
  //   let creator = {
  //     add:() => dispatch({type:'ADD'}),
  //     minus:() => dispatch({type:'MINUS'})
  //   }
  //   return {dispatch,...creator}
  // }
  //写法二使用utils添加dispatch
  (dispatch) => {
    let creators = {
      add:() => ({type:'ADD'}),
      minus:() => ({type:'MINUS'})
    }
    //给add、minus函数后面加上dispatch
    creators = bindActionCreators(creators,dispatch)
    return {dispatch,...creators}
  }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log('props',this.props)
      const {count,dispatch,add} = this.props
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <button onClick={()=>dispatch({type:'ADD'})}>dispatch:{count}</button>
          <button onClick={add}>add:{count}</button>
        </div>
      );
    }
  }
)
