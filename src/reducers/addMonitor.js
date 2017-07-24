import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { browserHistory } from 'react-router';

const addMonitor = handleActions({
  ['todos/addMonitor'](state){
    return { ...state, loading: true };
  },
  ['todos/addMonitor/success'](state, action){
    message.success("创建成功");
    setTimeout(function(){
      browserHistory.push('/qsm');
    },1500);
    return { ...state, success: action.payload, loading: false };
  },
  ['todos/addMonitor/falied'](state, action){
    message.error("创建失败");
    return { ...state, err: action.err, loading: false };
  }
},{
  success: false,
  loading: false
});

export default addMonitor;