import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { browserHistory } from 'react-router';

const updataAlarmStrategy = handleActions({
  ['todos/updateAlarmStrategy'](state){
    return { ...state, loading: true };
  },
  ['todos/updateAlarmStrategy/success'](state, action){
    message.success('修改成功');
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/updataAlarmStrategy/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  }
},{
  data: [],
  loading: false,
});

export default updataAlarmStrategy;