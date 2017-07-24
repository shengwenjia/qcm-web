import { handleActions } from 'redux-actions';

const deleteAlarmStrategy = handleActions({
  ['todos/deleteAlarmStrategy'](state){
    return { ...state, loading: true };
  },
  ['todos/deleteAlarmStrategy/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/deleteAlarmStrategy/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },
  /******************** 关闭或打开报警 **************************/
  ['todos/toggleAlarmStrategy'](state){
    return { ...state, loading: true };
  },
  ['todos/toggleAlarmStrategy/success'](state){
    return { ...state, loading: false };
  },
  ['todos/toggleAlarmStrategy/failed'](state){
    return { ...state, loading: false };
  },
},{
  data: [],
  loading: false,
});

export default deleteAlarmStrategy;