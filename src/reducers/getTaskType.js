import { handleActions } from 'redux-actions';
import { browserHistory } from 'react-router';

const getTaskType = handleActions({
  ['todos/getTaskType'](state){
    return { ...state, loading: true };
  },

  ['todos/getTaskType/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },

  ['todos/getTaskType/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  }
},{
  loading: false,
  data: [],
});

export default getTaskType;