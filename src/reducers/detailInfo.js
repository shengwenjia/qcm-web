import { handleActions } from 'redux-actions';

const detailInfo = handleActions({
  ['put/detailInfo'](state, action){
    return { ...state, data: action.payload };
  },

  ['todos/getTaskCharts'](state){
    return { ...state, loading: true };
  },

  ['todos/getTaskCharts/success'](state, action){
    return { ...state, chartData: action.payload, loading: false };
  },

  ['todos/getTaskCharts/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },
  ['todos/getMetricCharts'](state){
    return { ...state, loading: true };
  },

  ['todos/getMetricCharts/success'](state, action){
    return { ...state, MetricsChartData: action.payload, loading: false };
  },

  ['todos/getMetricCharts/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },

  ['todos/getlatestdata'](state){
    return { ...state};
  },

  ['todos/getlatestdata/success'](state, action){
    return { ...state, latestdata: action.payload };
  },

  ['todos/getlatestdata/failed'](state, action){
    return { ...state };
  },

  ['todos/getAlarmEvent'](state){
    return { ...state};
  },

  ['todos/getAlarmEvent/success'](state, action){
    return { ...state, eventdata: action.payload };
  },

  ['todos/getAlarmEvent/failed'](state, action){
    return { ...state ,err: action.err,};
  }

},{
  data: [],
  chartData: [],
  MetricsChartData: [],
  latestdata: [],
  eventdata:[]
});

export default detailInfo;