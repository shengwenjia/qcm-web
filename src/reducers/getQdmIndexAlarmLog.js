import { handleActions } from 'redux-actions';

const getQdmIndexAlarmLog = handleActions({
  ['todos/getQdmIndexAlarmLog'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmIndexAlarmLog/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/getQdmIndexAlarmLog/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },
  ['todos/getQdmIndexAlarmLog/init'](state, action){
    return { ...state, data: [], loading: false };
  }
},{
  data: [],
  loading: false
});

export default getQdmIndexAlarmLog;