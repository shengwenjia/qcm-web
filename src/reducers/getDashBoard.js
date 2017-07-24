import { handleActions } from 'redux-actions';

const getStrategyState = handleActions({
  ['todos/getStrategyState/'](state){
    return { ...state, loading: true };
  },

  ['todos/getStrategyState/failed'](state, action){
    return { ...state, err: action.err, loading: false };
  },

  ['todos/getStrategyState/success'](state, action){
    return { ...state, StrategyState: action.payload, loading: false }
  },



  ['todos/getEventNews/'](state,action){
    return { ...state, loading: true };
  },
  ['todos/getEventNews/success'](state,action){
    return { ...state, EventNews: action.payload, loading: false }
  },
  ['todos/getEventNews/failed'](state,action){
    return { ...state, err: action.err, loading: false };
  },

  ['todos/getMonitorResources'](state,action){
    return { ...state, loading: true };
  },
  ['todos/getMonitorResources/success'](state,action){
    return { ...state, MonitorResources: action.payload, loading: false }
  },
  ['todos/getMonitorResources/failed'](state,action){
    return { ...state, err: action.err, loading: false };
  },

},{
  loading: false,
  StrategyState: [],
  EventNews:[],
  MonitorResources:[]
});

export default getStrategyState;