import { handleActions } from 'redux-actions';

const tableList = handleActions({
  ['todos/get'](state){
    return { ...state, loading: true };
  },

  ['todos/get/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },

  ['todos/get/success'](state, action){
    return { ...state, data: action.payload, loading: false }
  }
},{
  loading: false,
  data: [],
});

export default tableList;