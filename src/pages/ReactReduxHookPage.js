// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../react-redux-nut';
import {useCallback} from 'react'

export default function ReactReduxHookPage(props) {
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();

  //add当作参数传则加缓存
  const add = useCallback(() => {
    dispatch({ type: 'ADD' });
  });

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button onClick={add}>{count}</button>
    </div>
  );
}
