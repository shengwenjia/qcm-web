import { handleActions } from 'redux-actions';

const alarmStrategy = handleActions({
  ['put/alarmStrategy'](state, action){
    return { ...state, data: action.payload };
  },
},{
  data: [],

});
 
export default alarmStrategy;