import { handleActions } from 'redux-actions';

const getMetrics = handleActions({
  ['todos/getMetrics'](state){
    return { ...state, loading: true };
  },
  ['todos/getMetrics/success'](state, action){
    return { ...state, data: action.payload, loading: false };    
  },
  ['todos/getMetrics/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  }
},{
  data: [],
  loading: false
});

export default getMetrics;