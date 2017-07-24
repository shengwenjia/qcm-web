import { handleActions } from 'redux-actions';

const dispatchReducer = handleActions({
  ['netLink/details'](state, action){
    return { ...state, netLinkId: action.payload };
  },
  ['idcLink/details'](state,action){
  	return { ...state, idcLinkId: action.payload };
  },
  ['baseServer/details'](state, action){
    return { ...state, baseServerId: action.payload };
  },
  ['baseServer/quota'](state, action){
    return { ...state, baseServerQuota: action.payload };
  },
  ['dispatchId/details'](state, action){
    return { ...state, toponode_id: action.payload };
  },
  ['dispatch/status'](state, action){
    return { ...state, status: action.status };
  },
},{
  toponode_id: '',
  netLinkId: '',
  idcLinkId: '',
  baseServerId: '',
  baseServerQuota: '',
  status: '', // 查询时的状态
});

export default dispatchReducer;