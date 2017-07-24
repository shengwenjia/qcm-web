import { handleActions } from 'redux-actions';
import { message } from 'antd';

const addAlarmUser = handleActions({
  ['todos/addAlarmUser'](state){
    return { ...state };
  },
  ['todos/addAlarmUser/success'](state, action){
    message.success('保存成功');
    return { ...state, data: action.payload };
  },
  ['todos/addAlarmUser/failed'](state, action){
    message.error('保存失败');
    return { ...state, err: action.err };
  }
},{
  data: [],
});

export default addAlarmUser;