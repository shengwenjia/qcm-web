import { handleActions } from 'redux-actions';

const idcList = handleActions({
    ['todos/getIdc'](state){
      return { ...state, loading: true };
    },
    ['todos/getIdc/success'](state, action){
      return { ...state, data: action.payload, loading: false };
    },
    ['todos/getIdc/failed'](state, action){
      return { ...state, err: action.err, loading: false };
    }
  },
  {
    loading: false,
    data: [],
  }
);

export default idcList;