import { handleActions } from 'redux-actions';

const getQdmDetailsData = handleActions({
  /*********** 获得网络链路的数据 ************/
  ['todos/getQdmLinkTasks'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmLinkTasks/success'](state, action){
    return { ...state, netdata: action.payload, loading: false };
  },
  ['todos/getQdmLinkTasks/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },
  /*********** 获得业务环节的数据 ************/
  ['todos/getQdmLinkTasksToponodes'](state){
    return { ...state };
  },
  ['todos/getQdmLinkTasksToponodes/success'](state, action){
    return { ...state, toponodes: action.payload };
  },
  ['todos/getQdmLinkTasksToponodes/failed'](state, action){
    return { ...state, err: action.e };
  },
  /*********** 获得网络链路详细信息的数据 ************/
  ['todos/getQdmLinkTaskStatistics'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmLinkTaskStatistics/success'](state, action){
    return { ...state, netdetailsdata: action.payload, loading: false };
  },
  ['todos/getQdmLinkTaskStatistics/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },
  /*********** 获得专线流量的数据 ************/
  ['todos/getQdmIdcTasks'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmIdcTasks/success'](state, action){
    return { ...state, idcdata: action.payload, loading: false };
  },
  ['todos/getQdmIdcTasks/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },
  /*********** 获得专线流量详细信息的数据 ************/
  ['todos/getQdmIdcTaskStatistics'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmIdcTaskStatistics/success'](state, action){
    return { ...state, idcdetailsdata: action.payload, loading: false };
  },
  ['todos/getQdmIdcTaskStatistics/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },

  /******************** 获得基础服务器的数据 **********************/
  ['todos/getQdmServerTasks'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmServerTasks/success'](state, action){
    return { ...state, serverdata: action.payload, loading: false };
  },
  ['todos/getQdmServerTasks/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },

  /**************** 获得基础服务器详细信息的数据 ******************/
  ['todos/getQdmServerTaskStatistics'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmServerTaskStatistics/success'](state, action){
    return { ...state, serverdetailsdata: action.payload, loading: false };
  },
  ['todos/getQdmServerTaskStatistics/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },

  /************************* 获得更多指标的详细数据 ***************************/
  ['todos/getQdmServerQueryMetrics'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmServerQueryMetrics/success'](state, action){
    return { ...state, serverquerymetrics: action.payload, loading: false };
  },
  ['todos/getQdmServerQueryMetrics/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  },

  /********************** 获得更多指标的历史数据 ****************************/
  ['todos/getQdmServerQueryMetricsHistory'](state){
    return { ...state, loading: true };
  },
  ['todos/getQdmServerQueryMetricsHistory/success'](state, action){
    return { ...state, serverquerymetricshistory: action.payload, loading: false };
  },
  ['todos/getQdmServerQueryMetricsHistory/failed'](state, action){
    return { ...state, err: action.e, loading: false };
  }
},{
  netdata: {},
  idcdata: {},
  serverdata: {},
  netdetailsdata: [],
  idcdetailsdata: [],
  serverdetailsdata: [],
  serverquerymetrics: [],
  serverquerymetricshistory: [],
  toponodes: [],
  loading: false,
});

export default getQdmDetailsData;