import { handleActions } from 'redux-actions';

const alarmCreate = handleActions({
  ['todos/alarmCreate'](state, action){
    return { ...state, data: action.payload };
  },
  ['transmitId'](state, action){
    return { ...state, id: action.payload };
  }
},{
  data: [],
  id: '',
});

export default alarmCreate;