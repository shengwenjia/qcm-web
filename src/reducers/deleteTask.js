import { handleActions } from 'redux-actions';
import { message } from 'antd';

const deleteTask = handleActions({
  ['todos/deleteTask'](state){
    return { ...state, loading: true };
  },
  ['todos/deleteTask/success'](state, action){
    message.success("删除成功");
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/deleteTask/failed'](state, action){
    message.error("删除失败");
    return { ...state, err: action.err, loading: false };
  }
},{
  loading: false,
});

export default deleteTask;