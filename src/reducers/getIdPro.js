import { handleActions } from 'redux-actions';
import { browserHistory } from 'react-router';

const getIdPro = handleActions({
  ['todos/getIdPro'](state){
    return { ...state, loading: true };
  },

  ['todos/getIdPro/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },

  ['todos/getIdPro/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  }
},{
  loading: false,
  data: [],
});

export default getIdPro;