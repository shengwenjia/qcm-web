import { handleActions } from 'redux-actions';
import { browserHistory } from 'react-router';

const getTask = handleActions({
  ['todos/getTask'](state){
    return { ...state, loading: true };
  },

  ['todos/getTask/success'](state, action){
    return { ...state, taskdata: action.payload, loading: false };
  },

  ['todos/getTask/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  }
},{
  loading: false,
  taskdata: [],
});

export default getTask;