import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { browserHistory } from 'react-router';

const createAlarmStrategies = handleActions({
  ['todos/createAlarmStrategies'](state){
    return { ...state, loading: true };
  },
  ['todos/createAlarmStrategies/success'](state, action){
    message.success('创建成功');
    setTimeout(function(){
      browserHistory.push('/qsm');
    }, 1500);
    return { ...state, success: action.payload, loading: false };
  },
  ['todos/createAlarmStrategies/failed'](state, action){
    message.error('创建失败');
    return { ...state, err: action.e, loading: false };
  }
},{
  success: false,
  loading: false,
});

export default createAlarmStrategies;