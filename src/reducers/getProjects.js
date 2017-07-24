import { handleActions } from 'redux-actions';

const getProjects = handleActions({
  ['todos/getProjects'](state){
    return { ...state, loading: true };
  },
  ['todos/getProjects/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/getProjects/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },
  ['todos/putProject'](state, action){
    return { ...state, project: action.payload, loading: false };
  }
},{
  loading: false,
  data: [],
  project: {},
});

export default getProjects;