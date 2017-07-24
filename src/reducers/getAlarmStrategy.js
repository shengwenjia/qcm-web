import { handleActions } from 'redux-actions';

const getAlarmStrategy = handleActions({
  ['todos/getAlarmStrategy'](state){
    return { ...state, loading: true };
  },
  ['todos/getAlarmStrategy/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/getAlarmStrategy/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },
  ['put/getAlarmPause'](state, action){
    return { ...state, alarmdata: action.payload};
  }
},{
  data: [],
  alarmdata:[],
  loading: false,
});

export default getAlarmStrategy;