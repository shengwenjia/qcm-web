import { handleActions } from 'redux-actions';

const getAlarmUser = handleActions({
  ['todos/getAlarmUser'](state){
    return { ...state, loading: true };
  },
  ['todos/getAlarmUser/success'](state, action){
    return { ...state, loading: false, data: action.payload };
  },
  ['todos/getAlarmUser/failed'](state, action){
    return { ...state, loading: false, err: action.err };
  }
},{
  data: [],
  loading: false,
});

export default getAlarmUser;