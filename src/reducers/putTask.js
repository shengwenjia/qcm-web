import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { browserHistory } from 'react-router';

const putTask = handleActions({
  ['todos/putTask'](state){
    return { ...state, loading: true };
  },

  ['todos/putTask/success'](state, action){
    message.success("修改成功");
    setTimeout(function(){
      browserHistory.push('/qsm');
    },1500);
    return { ...state, data: action.payload, loading: false };
  },

  ['todos/putTask/falied'](state, action){
    message.error("修改失败，请检查数据格式");
    return { ...state, err: action.err, loading: false };
  }
},{
  loading: false
});

export default putTask;