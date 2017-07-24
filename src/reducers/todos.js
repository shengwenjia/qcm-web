import { combineReducers } from 'redux';
import getAllTasks from './getAllTasks';
import idcList from './idcList';
import addMonitor from './addMonitor';
import getTask from './getTask';
import putTask from './putTask';
import deleteTask from './deleteTask';
import getProjects from './getProjects';
import getTaskType from './getTaskType';
import alarmCreate from './alarmCreate';
import addAlarmUser from './addAlarmUser';
import getAlarmUser from './getAlarmUser';
import detailInfo from './detailInfo';
import alarmStrategy from './alarmStrategy';
import getMetrics from './getMetrics';
// import createAlarmStrategy from './createAlarmStrategy';
import getAlarmStrategies from './getAlarmStrategies';
import deleteAlarmStrategy from './deleteAlarmStrategy';
import getAlarmStrategy from './getAlarmStrategy';
import updataAlarmStrategy from './updateAlarmStrategy';
import createAlarmStrategies from './createAlarmStrategies';
import getQdmIndexData from './getQdmIndexData';
import getQdmIndexAlarmLog from './getQdmIndexAlarmLog';
import getQdmDetailsData from './getQdmDetailsData';

import getDashBoard from './getDashBoard';

/* 组件通讯 reducer */
import dispatchReducer from './dispatchReducer';

export default combineReducers({
  getAllTasks,
  idcList,
  addMonitor,
  getTask,
  putTask,
  deleteTask,
  getProjects,
  getTaskType,
  alarmCreate,
  addAlarmUser,
  getAlarmUser,
  detailInfo,
  alarmStrategy,
  getMetrics,
  getAlarmStrategies,
  deleteAlarmStrategy,
  getAlarmStrategy,
  updataAlarmStrategy,
  createAlarmStrategies,
  getQdmIndexData,
  getQdmIndexAlarmLog,
  getQdmDetailsData,

  getDashBoard,

  dispatchReducer, // 组件通讯
});
