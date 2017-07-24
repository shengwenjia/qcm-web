import { handleActions } from 'redux-actions';
import { notification } from 'antd';

const getQdmIndexData = handleActions({
  ['todos/getQdmIndexData'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmIndexData/success'](state, action){
    return { ...state, data: action.payload, loading: false };
  },
  ['todos/getQdmIndexData/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },
  ['todos/addactid'](state, action){
    return { ...state, addactidloading: true };
  },
  ['todos/addactid/success'](state, action){
    notification['success']({
      message: 'Success',
      description: action.payload,
      key: 'addactidsuccess',
      duration: null
    });
    return { ...state, addactidloading: false };
  },
  ['todos/addactid/failed'](state, action){
    notification['error']({
      message: 'Error',
      description: action.e,
      key: 'addactidfailed'
    });
    return { ...state, addactidloading: false };
  },
  ['todos/querytmpbroadcastlist'](state, action){
    return { ...state, querytmpbroadcastlistloading: true };
  },
  ['todos/querytmpbroadcastlist/success'](state, action){
    return { ...state, querytmpbroadcastlistloading: false, tmp_broadcast_list: action.payload };
  },
  ['todos/querytmpbroadcastlist/failed'](state, action){
    return { ...state, querytmpbroadcastlistloading: false };
  },
  ['todos/deletetmpbroadcastlist'](state, action){
    return { ...state };
  },
  ['todos/deletetmpbroadcastlist/success'](state, action){
    notification['success']({
      message: 'Success',
      description: action.payload,
      key: 'deletetmpbroadcastsuccess'
    });
    return { ...state };
  },
  ['todos/deletetmpbroadcastlist/failed'](state, action){
    notification['error']({
      message: 'Error',
      description: action.e,
      key: 'deletetmpbroadcastfailed'
    });
    return { ...state };
  },
  ['todos/querytmpsummarydata'](state, action){
    return { ...state };
  },
  ['todos/querytmpsummarydata/success'](state, action){
    return { ...state, tmpsummarydata: action.payload };
  },
  ['todos/querytmpsummarydata/failed'](state, action){
    notification['error']({
      message: 'Error',
      description: action.e,
      key: 'querytmpsummarydatafailed'
    });
    return { ...state };
  },
  ['todos/isopenaddtmp'](state, action){
    return { ...state, isopenaddtmp: action.isopenaddtmp };
  },
},{
  data: [],
  tmp_broadcast_list: [],
  tmpsummarydata: [],
  loading: false,
  querytmpbroadcastlistloading: false,
  isopenaddtmp: false,
  addactidloading: false
});

export default getQdmIndexData;