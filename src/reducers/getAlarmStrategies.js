import { handleActions } from 'redux-actions';

const getAlarmStrategies = handleActions({
  ['todos/getAlarmStrategies'](state){
    return { ...state, loading: true };
  },
  ['todos/getAlarmStrategies/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/getAlarmStrategies/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  }
},{
  data: [],
  loading: false,
});

export default getAlarmStrategies;