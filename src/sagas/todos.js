import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { message } from 'antd';

import { getAllTasks, getTask } from '../services/todos'; // 获得监控项的方法
import { getIdcList, getProjects } from '../services/todos'; 
import { addPing, addHttp, addDns, addTcp } from '../services/todos'; // 新增监控项所需的方法
import { putPingTask, putHttpTask, putTcpTask, putDnsTask } from '../services/todos'; // 修改监控项所需的方法
import { deleteTask } from '../services/todos'; // 删除监控项所需的方法
import { addAlarmUser, getAlarmUser, createAlarm, getMetrics, getAlarmStrategies, deleteAlarmStrategy, getAlarmStrategy, updateAlarmStrategy, toggleAlarmStrategy,getAlarmEvent } from '../services/todos'; // 添加报警对象所需的方法

import { getQdmIndexData, getQdmIndexAlarmLog, getQdmLinkTasks, getQdmLinkTasksToponodes, getQdmLinkTaskStatistics, getQdmIdcTasks, getQdmIdcTaskStatistics, getQdmServerTasks, getQdmServerTaskStatistics, getQdmServerQueryMetrics, getQdmServerQueryMetricsHistory, addNewChannel, queryTmpBroadcastList, deleteTmpBroadcastList, queryTmpSummaryData, getTaskCharts ,getMetricCharts, getLatestData} from '../services/todos'; // qdm页面所需接口

import { getStrategyState, getEventNews, getMonitorResources } from '../services/todos';//获得概览页面


var taskstype = 'all';
/*
 * 所有数据获取
 */
function* get_allTasks(data) {
  taskstype = data.payload;
  if(location.pathname == '/qsm'){
    try{
      const { jsonResult } = yield call(getAllTasks, taskstype);
      if(jsonResult.data){
        yield put({
          type: 'todos/get/success',
          payload: jsonResult.data.tasks,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/get/failed',
        err
      });
    }
  }
}
/* 
 * 获得指定id的数据 
 * @param id 指定id
 */
function* get_task(data){
  const id = data.id;
  try{
    const { jsonResult } = yield call(getTask, id);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getTask/success',
        payload: jsonResult.data.task,
      });
    }
  }catch(err){
    message.error(err);
    yield put({
      type: 'todos/getTask/failed',
      err
    });
  }
}
/* 
 * 修改指定id的数据 
 * @param id 指定id
 */
function* put_task(data){
  const values = data.values;
  try{
    if(values.type == 'PING'){ // 修改ping页面
      const { jsonResult } = yield call(putPingTask, values.project_id, values.task_name, values.target, values.period, values.nodes, values.type, values.task_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/putTask/success',
          payload: jsonResult.data,
        });
      }
    }
    if(values.type == 'HTTP'){ // 修改http页面
      const { jsonResult } = yield call(putHttpTask, values.project_id, values.task_name, values.target, values.period, values.nodes, values.method, values.type, values.task_id, values.maxredirs, values.cookies, values.headers, values.body);
      if(jsonResult.data){
        yield put({
          type: 'todos/putTask/success',
          payload: jsonResult.data,
        });
      }
    }
    if(values.type == 'TCP'){ // 修改tcp页面
      const { jsonResult } = yield call(putTcpTask, values.project_id, values.task_name, values.target, values.period, values.nodes, values.port, values.type, values.task_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/putTask/success',
          payload: jsonResult.data,
        });
      }
    }
    if(values.type == 'DNS'){// 修改dns页面
      const { jsonResult } = yield call(putDnsTask, values.project_id, values.task_name, values.target, values.period, values.nodes, values.type, values.task_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/putTask/success',
          payload: jsonResult.data,
        });
      }
    }
  }catch(err){
    message.error(err);
    yield put({
      type: 'todos/putTask/failed',
      err
    });
  }
}

/*
 * 获得所有idc列表
 */
function* getIdc() {// 项目开始时加载idc列表
  // if(location.pathname == '/qsm'){
    try{
      const { jsonResult } = yield call(getIdcList);
      if(jsonResult.data){
        yield put({
          type: 'todos/getIdc/success',
          // payload: jsonResult.data.nodes,
          payload: jsonResult.data.node,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/getIdc/failed',
        err
      });
    }
  // }
}

/*
 * 获得用户项目列表
 */
function* get_projects(){
  // if(location.pathname == '/qsm'){
    try{
      const { jsonResult } = yield call(getProjects);
      if(jsonResult.data){
        yield put({
          type: 'todos/getProjects/success',
          payload: jsonResult.data.projects,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/getProjects/failed',
        err
      });
    }
  // }
}

/*
 * 添加监测点
 * @param data 需要新增的数据
 */
function* addMonitor(data){
  const values = data.values;
  try{
    if(values.type == 'PING'){ // 新增ping检测项
      const { jsonResult } = yield call(addPing, values.type, values.task_name, values.target, values.period, values.nodes, values.project_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/addMonitor/success',
          payload: jsonResult.data,
        });
      }
    }
    if(values.type == 'HTTP'){// 新增http检测项
      const { jsonResult } = yield call(addHttp, values.type, values.task_name, values.target, values.period, values.nodes, values.method, values.project_id, values.cookies, values.headers, values.body, values.maxredirs);
      if(jsonResult.data){
        yield put({
          type: 'todos/addMonitor/success',
          payload: jsonResult.data,
        });
      }
    }
    if(values.type == 'DNS'){// 新增dns检测项
      const { jsonResult } = yield call(addDns, values.type, values.task_name, values.target, values.period, values.nodes, values.project_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/addMonitor/success',
          payload: jsonResult.data,
        });
      }
    }
    if(values.type == 'TCP'){// 新增tcp检测项
      const { jsonResult } = yield call(addTcp, values.type, values.task_name, values.target, values.period, values.nodes, values.port, values.project_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/addMonitor/success',
          payload: jsonResult.data,
        });
      }
    }
  }catch(err){
    message.error(err);
    yield put({
      type: 'todos/addMonitor/falied',
      err
    });
  }
}

/*
 * 删除监控项
 * @param id 删除项的id
 */
function* delete_task(data){
  const project_id = data.values;
  try{
    const { jsonResult } = yield call(deleteTask, project_id);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/deleteTask/success',
        payload: jsonResult,
      });

      yield put({ // 重新请求数据
        type: 'todos/get',
        payload: taskstype
      });
    }
  }catch(err){
    message.error(err);
    yield put({
      type: 'todos/deleteTask/failed',
      err,
    });
  }
}

/*
 * 添加报警对象用户
 */
function* add_alarmUser(values){
  const user = values.payload;
  try{
    const { jsonResult } = yield call(addAlarmUser, user);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/addAlarmUser/success',
        payload: jsonResult.data,
      });

      yield put({ // 添加完成之后重新请求报警对象列表
        type: 'todos/getAlarmUser',
      });
    }
  }catch(err){
    message.error(err);
    yield put({
      type: 'todos/addAlarmUser/failed',
      err,
    });
  }
}
/*
 * 获得报警对象用户列表
 */
function* get_alarmUser(){
  try{
    const { jsonResult } = yield call(getAlarmUser);
    if(jsonResult.data){
      yield put({
        type: 'todos/getAlarmUser/success',
        payload: jsonResult.data,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/getAlarmUser/failed',
      err
    });
  }
}
/*
 * 获得报警事件列表
 * 2017/3/10 zytao
 */
function* get_alarmEvent(values){
  const task_id= values.task_id;
  const start= values.start;
  const end= values.end;
  const event_type=values.event_type;
  try{
    const { jsonResult } = yield call(getAlarmEvent,  task_id, event_type, start, end);
    if(jsonResult.data){
      yield put({
        type: 'todos/getAlarmEvent/success',
        payload: jsonResult.data,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/getAlarmEvent/failed',
      err
    });
  }
}


/*
 * 获得metrics列表
 */
// function* get_metrics(values){
//   const task_type = values.payload;
//   try{
//     const { jsonResult } = yield call(getMetrics, task_type);
//     if(jsonResult.data){   
//       yield put({
//         type: 'todos/getMetrics/success',
//         payload: jsonResult.data
//       });
//     }else{
//       yield put({
//         type: 'todos/getMetrics/success',
//         payload: [],
//       })
//     }
//   }catch(err){ 
//     /*****************未解决bug*******************/
//     // yield put({
//     //   type: 'todos/getMetrics/failed',
//     //   err
//     // });
//   }
// }
/*
 * 创建报警对象
 */
function* create_alarmStrategy(values) {
  const data = values.payload;
  try{
    const { jsonResult } = yield call(createAlarm, data);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/createAlarmStrategies/success',
        payload: true,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/createAlarmStrategies/failed',
      err
    });
  }
}
/*
 * 获得具体监控项的所有告警策略
 */
function* get_alarmStrategies(values) {
  const task_id = values.payload;
  try{
    const { jsonResult } = yield call(getAlarmStrategies, task_id);
    if(jsonResult.data){
      yield put({
        type: 'todos/getAlarmStrategies/success',
        payload: jsonResult.data,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/getAlarmStrategies/failed',
      err
    });
  }
}
/*
 * 删除报警策略
 */
function* delete_alarmStrategy(values){
  const task_id = values.payload.task_id;
  const alarm_strategy_id = values.payload.alarm_strategy_id;
  try{
    const { jsonResult } = yield call(deleteAlarmStrategy, task_id, alarm_strategy_id);
    if(jsonResult.code == 0){
      message.success('删除成功');
      yield put({
        type: 'todos/deleteAlarmStrategy/success',
        payload: jsonResult.data,
      });

      yield put({
        type: 'todos/getAlarmStrategies',
        payload: task_id,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/deleteAlarmStrategy/failed',
      err
    });
  }
}
/**
 * 报警策略屏蔽或打开
 */
function* toggle_alarmStrategy(values){
  const task_id = values.payload.task_id;
  const alarm_strategy_id = values.payload.alarm_strategy_id;
  const pause = values.payload.pause;
  try{
    const { jsonResult } = yield call(toggleAlarmStrategy, task_id, alarm_strategy_id, pause);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/toggleAlarmStrategy/success',
      });

      yield put({
        type: 'todos/getAlarmStrategies',
        payload: task_id,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/toggleAlarmStrategy/failed',
      err
    });
  }
}
/*
 * 修改报警策略时，获取指定的某一个报警策略
 */
function* get_alarmStrategy(values){
  const alarm_strategy_id = values.payload;
  try{
    const { jsonResult } = yield call(getAlarmStrategy, alarm_strategy_id);
    if(jsonResult.data){
      yield put({
        type: 'todos/getAlarmStrategy/success',
        payload: jsonResult.data.alarm_strategy,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/getAlarmStrategy/failed',
      err
    });
  }
}
/*
 * 修改报警策略
 */
function* update_alarmStrategy(values){
  const data = values.payload;
  try{
    const { jsonResult } = yield call(updateAlarmStrategy, data);
    if(jsonResult.data){
      yield put({
        type: 'todos/updateAlarmStrategy/success',
        payload: jsonResult.data,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/updataAlarmStrategy/failed',
      err
    });
  }
}
/*
 * 获得报警的charts数据
 */
 function* get_TaskCharts(values){
  const task_id = values.payload.id;
  const start = values.payload.start;
  const end = values.payload.end;
  const node_ip = values.payload.node_ip;
  const need_avg = values.payload.need_avg ? values.payload.need_avg : false;
  try{
    const { jsonResult }=yield call(getTaskCharts, task_id, start, end, node_ip, need_avg);
    if(jsonResult.data){
      yield put({
        type:'todos/getTaskCharts/success',
        payload:jsonResult.data,
      });
    }
  }catch(err){
    yield put({
      type:'todos/getTaskCharts/failed',
      err
    });
  }
 }
 /*
 *获得charts的数据名称
 */
 function* get_MetricCharts(values){
  const task_type=values.payload.monitor_type;
  try{
    const { jsonResult }=yield call(getMetricCharts,task_type);
    if(jsonResult.data){
      yield put({
        type:'todos/getMetricCharts/success',
        payload:jsonResult.data.metrics,
      });
    }
  }catch(err){
    yield put({
      type:'todos/getMetricCharts/failed',
      err
    });
  }
 }
/*
 * 获得qdm首页所需数据
 */
function* get_qdmIndexData(values){
  const topo_id = values.topo_id;
  try{
    const { jsonResult } = yield call(getQdmIndexData, topo_id);
    if(jsonResult.data){
      yield put({
        type: 'todos/getQdmIndexData/success',
        payload: jsonResult.data,
      });
    }
  }catch(err){
    yield put({
      type: 'todos/getQdmIndexData/failed',
      err
    });
  }
}

/*
 * 获得 qdm 首页的报警日志
 */
function* get_qdmIndexAlarmLog(values){
  const topomap_id = values.topomap_id;
  const start = values.start;
  const end = values.end;
  const channel_detail_ids = values.channel_detail_ids;
  try{
    const { jsonResult } = yield call(getQdmIndexAlarmLog, topomap_id, start, end, channel_detail_ids);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmIndexAlarmLog/success',
        payload: jsonResult.data,
      });
    }else{
      yield put({
        type: 'todos/getQdmIndexAlarmLog/success',
        payload: [],
      });
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmIndexAlarmLog/failed',
      e
    });
  }
}

/*
 * 获得 qdm 网络链路二级页面的数据
 */
function* get_qdmLinkTasks(values){
  const topomap_id = values.topomap_id;
  const status = values.status;
  const offset = values.offset;
  const row = values.row;
  const src_ip = values.src_ip;
  const dst_ip = values.dst_ip;
  const toponode_id = values.toponode_id;
  try{
    const { jsonResult } = yield call(getQdmLinkTasks, topomap_id, src_ip, dst_ip, status, offset, row, toponode_id);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmLinkTasks/success',
        payload: jsonResult.data,
      });
    }else{
      yield put({
        type: 'todos/getQdmLinkTasks/success',
        payload: {},
      });
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmLinkTasks/failed',
      e
    });
  }
}

/*
 * 获得 qdm 二级页面的业务环节
 */
function* get_qdmLinkTasksToponodes(values){
  const topomap_id = values.topomap_id;
  const toponode_type = values.toponode_type;
  try{
    const { jsonResult } = yield call(getQdmLinkTasksToponodes, topomap_id, toponode_type);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmLinkTasksToponodes/success',
        payload: jsonResult.data
      });
    }else{
      yield put({
        type: 'todos/getQdmLinkTasksToponodes/success',
        payload: []
      });
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmLinkTasksToponodes/failed',
      e
    });
  }
}

/*
 * 获得 qdm 网络链路三级页面的详细数据
 */
function* get_qdmLinkTaskStatistics(values){
  const task_id = values.task_id;
  const start = values.start;
  const end = values.end;
  try{
    const { jsonResult } = yield call(getQdmLinkTaskStatistics, task_id, start, end);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmLinkTaskStatistics/success',
        payload: jsonResult.data,
      });
    }else{
      yield put({
        type: 'todos/getQdmLinkTaskStatistics/success',
        payload: [],
      });
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmLinkTaskStatistics/failed',
      e
    })
  }
}

/*
 * 获得 qdm 专线流量二级页面的数据
 */
function* get_qdmIdcTasks(values){
  const topomap_id = values.topomap_id;
  const offset = values.offset;
  const row = values.row;
  const toponode_id = values.toponode_id;
  const status = values.status;

  try{
    const { jsonResult } = yield call(getQdmIdcTasks, topomap_id, offset, row, toponode_id, status);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmIdcTasks/success',
        payload: jsonResult.data
      });
    }else{
      yield put({
        type: 'todos/getQdmIdcTasks/success',
        payload: {}
      })
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmIdcTasks/failed',
      e
    });
  }
}

/*
 * 获得 qdm 专线流量三级页面的详细数据
 */
function* get_qdmIdcTaskStatistics(values){
  const task_id = values.task_id;
  const start = values.start;
  const end = values.end;
  try{
    const { jsonResult } = yield call(getQdmIdcTaskStatistics, task_id, start, end);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmIdcTaskStatistics/success',
        payload: jsonResult.data,
      });
    }else{
      yield put({
        type: 'todos/getQdmIdcTaskStatistics/success',
        payload: [],
      });
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmIdcTaskStatistics/failed',
      e
    })
  }
}

/*
 * 获得 qdm 基础服务器的二级页面数据
 */
function* get_qdmServerTasks(values){
  const topomap_id = values.topomap_id;
  const offset = values.offset;
  const row = values.row;
  const toponode_id = values.toponode_id;
  const private_ip = values.private_ip;
  const status = values.status;

  try{
    const { jsonResult } = yield call(getQdmServerTasks, topomap_id, offset, row, toponode_id, private_ip, status);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmServerTasks/success',
        payload: jsonResult.data
      })
    }else{
      yield put({
        type: 'todos/getQdmServerTasks/success',
        payload: {},
      })
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmServerTasks/failed',
      e
    })
  }
}

/*
 * 获得 qdm 基础服务器三级页面的详细数据
 */
function* get_qdmServerTaskStatistics(values){
  const task_id = values.task_id;
  const start = values.start;
  const end = values.end;

  try{
    const { jsonResult } = yield call(getQdmServerTaskStatistics, task_id, start, end);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmServerTaskStatistics/success',
        payload: jsonResult.data,
      })
    }else{
      yield put({
        type: 'todos/getQdmServerTaskStatistics/success',
        payload: []
      })
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmServerTaskStatistics/failed',
      e
    })
  }
}

/*
 * 获得 qdm 更多指标的详细数据
 */
function* get_qdmServerQueryMetrics(values){
  const ip = values.ip;

  try{
    const { jsonResult } = yield call(getQdmServerQueryMetrics, ip);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmServerQueryMetrics/success',
        payload: jsonResult.data
      })
    }else{
      yield put({
        type: 'todos/getQdmServerQueryMetrics/success',
        payload: []
      })
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmServerQueryMetrics/failed',
      e
    })
  }
}

/*
 * 获得 qdm 更多指标的历史数据
 */
function* get_qdmServerQueryMetricsHistory(values){
  const itemid = values.itemid;
  const server = values.server;
  const value_type = values.value_type;
  const start = values.start;
  const end = values.end;

  try{
    const { jsonResult } = yield call(getQdmServerQueryMetricsHistory, itemid, server, value_type, start, end);
    if(jsonResult.code == 0){
      yield put({
        type: 'todos/getQdmServerQueryMetricsHistory/success',
        payload: jsonResult.data
      })
    }else{
      yield put({
        type: 'todos/getQdmServerQueryMetricsHistory/success',
        payload: []
      })
    }
  }catch(e){
    yield put({
      type: 'todos/getQdmServerQueryMetricsHistory/failed',
      e
    })
  }
}

/*
 * 添加临时直播 
 */
function* add_new_channel(channel_id) {
  if(location.pathname == '/qam/qdm'){
    try{
      const { jsonResult } = yield call(addNewChannel, channel_id);
      if(jsonResult.data){
        yield call(query_tmpbroadcast_list);
        yield put({
          type: 'todos/addactid/success',
          payload: jsonResult.data,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/addactid/failed',
        err
      });
    }
  }
}

/*
 * 查询临时直播 
 */
function* query_tmpbroadcast_list() {
  if(location.pathname == '/qam/qdm'){
    try{
      const { jsonResult } = yield call(queryTmpBroadcastList);
      if(jsonResult.data){
        yield put({
          type: 'todos/querytmpbroadcastlist/success',
          payload: jsonResult.data,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/querytmpbroadcastlist/failed',
        err
      });
    }
  }
}

/*
 * 删除临时直播 
 */
function* delete_tmpbroadcast_list(channel_detail_id) {
  if(location.pathname == '/qam/qdm'){
    try{
      const { jsonResult } = yield call(deleteTmpBroadcastList, channel_detail_id);
      if(jsonResult.data){
        yield put({
          type: 'todos/deletetmpbroadcastlist/success',
          payload: jsonResult.data,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/deletetmpbroadcastlist/failed',
        err
      });
    }
  }
}

/*
 * 查询临时直播拓扑统计数据 
 */
function* query_tmpbroadcast_summary(channel_detail_ids) {
  if(location.pathname == '/qam/qdm'){
    try{
      const { jsonResult } = yield call(queryTmpSummaryData, channel_detail_ids);
      if(jsonResult.data){
        yield put({
          type: 'todos/querytmpsummarydata/success',
          payload: jsonResult.data,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/querytmpsummarydata/failed',
        err
      });
    }
  }
}

function* getlatestdata(task_id) {
    try{
      const { jsonResult } = yield call(getLatestData, task_id.payload);
      if(jsonResult.data){
        yield put({
          type: 'todos/getlatestdata/success',
          payload: jsonResult.data,
        });
      }
    }catch(err){
      message.error(err);
      yield put({
        type: 'todos/getlatestdata/failed',
        err
      });
    }
}

// 获得概览页面:实时告警策略状态
function* get_strategy_state(){
  

  try{
    const { jsonResult } = yield call(getStrategyState);
    if(jsonResult.data){
      yield put({
        type:'todos/getStrategyState/success',
        payload:jsonResult.data,
      });
    }
  }catch(err){
      yield put({
        type:'todos/getStrategyState/failed',
        err
      });
  }
}

function* get_event_news(){
  try{
    const { jsonResult } = yield call(getEventNews);
    if(jsonResult.data){
      yield put({
        type:'todos/getEventNews/success',
        payload:jsonResult.data,
      });
    }
  }catch(err){
      yield put({
        type:'todos/getEventNews/failed',
        err
      });
  }
}

function* get_monitor_resources(){
  try{
    const { jsonResult } = yield call(getMonitorResources);
    if(jsonResult.data){
      yield put({
        type:'todos/getMonitorResources/success',
        payload:jsonResult.data,
      });
    }
  }catch(err){
      yield put({
        type:'todos/getMonitorResources/failed',
        err
      });
  }
}








/* 项目数据监听 */
function* watchAllTasks() {
  yield takeEvery('todos/get', get_allTasks);
}
function* watchGetIdcList() {
  yield takeEvery('todos/getIdc', getIdc);
}
function* watchAddMonitor() {
  yield takeEvery('todos/addMonitor', addMonitor);
}
function* watchGetTask() {
  yield takeEvery('todos/getTask', get_task);
}
function* watchPutTask() {
  yield takeEvery('todos/putTask', put_task);
}
function* watchGetTaskCharts() {
  yield takeEvery('todos/getTaskCharts', get_TaskCharts);
}
function* watchGetMetricCharts() {
  yield takeEvery('todos/getMetricCharts', get_MetricCharts);
}
function* watchDeleteTask() {
  yield takeEvery('todos/deleteTask', delete_task);
}
function* watchGetProjects() {
  yield takeEvery('todos/getProjects', get_projects);
}
function* watchAddAlarmUser() {
  yield takeEvery('todos/addAlarmUser', add_alarmUser);
}
function* watchGetAlarmUser() {
  yield takeEvery('todos/getAlarmUser', get_alarmUser);
}
function* watchGetAlarmEvent() {
  yield takeEvery('todos/getAlarmEvent', get_alarmEvent);
}
// function* watchGetMetrics() {
//   yield takeEvery('todos/getMetrics', get_metrics);
// }
function* watchCreateAlarmStrategy() {
  yield takeEvery('todos/createAlarmStrategies', create_alarmStrategy);
}
function* watchGetAlarmStrategies() {
  yield takeEvery('todos/getAlarmStrategies', get_alarmStrategies);
}
function* watchDeleteAlarmStrategy() {
  yield takeEvery('todos/deleteAlarmStrategy', delete_alarmStrategy);
}
function* watchToggleAlarmStrategy() {
  yield takeEvery('todos/toggleAlarmStrategy', toggle_alarmStrategy);
}
function* watchGetAlarmStrategy() {
  yield takeEvery('todos/getAlarmStrategy', get_alarmStrategy);
}
function* watchUpdateAlarmStrategy() {
  yield takeEvery('todos/updateAlarmStrategy', update_alarmStrategy);
}
function* watchGetQdmIndexData() {
  yield takeEvery('todos/getQdmIndexData', get_qdmIndexData);
}
function* watchGetQdmIndexAlarmLog() {
  yield takeEvery('todos/getQdmIndexAlarmLog', get_qdmIndexAlarmLog);
}
function* watchGetQdmLinkTasks() {
  yield takeEvery('todos/getQdmLinkTasks', get_qdmLinkTasks);
}
function* watchGetQdmLinkTasksToponodes() {
  yield takeEvery('todos/getQdmLinkTasksToponodes', get_qdmLinkTasksToponodes);
}
function* watchGetQdmLinkTaskStratistics() {
  yield takeEvery('todos/getQdmLinkTaskStatistics', get_qdmLinkTaskStatistics);
}
function* watchGetQdmIdcTasks() {
  yield takeEvery('todos/getQdmIdcTasks', get_qdmIdcTasks);
}
function* watchGetQdmIdcTaskStratistics() {
  yield takeEvery('todos/getQdmIdcTaskStatistics', get_qdmIdcTaskStatistics);
}
function* watchGetQdmServerTasks() {
  yield takeEvery('todos/getQdmServerTasks', get_qdmServerTasks);
}
function* watchGetQdmServerTaskStratistics() {
  yield takeEvery('todos/getQdmServerTaskStatistics', get_qdmServerTaskStatistics);
}
function* watchGetQdmServerQueryMetrics() {
  yield takeEvery('todos/getQdmServerQueryMetrics', get_qdmServerQueryMetrics);
}
function* watchGetQdmServerQueryMetricsHistory() {
  yield takeEvery('todos/getQdmServerQueryMetricsHistory', get_qdmServerQueryMetricsHistory);
}
function* watchAddNewChannel() {
  yield takeEvery('todos/addactid', add_new_channel);
}
function* watchQueryTmpBroadcastList() {
  yield takeEvery('todos/querytmpbroadcastlist', query_tmpbroadcast_list);
}
function* watchDeleteTmpBroadcastList() {
  yield takeEvery('todos/deletetmpbroadcastlist', delete_tmpbroadcast_list);
}
function* watchqueryTmpbroadcastSummary() {
  yield takeEvery('todos/querytmpsummarydata', query_tmpbroadcast_summary);
}

function* watchquerygetlatestdata() {
  yield takeEvery('todos/getlatestdata', getlatestdata);
}

function* watchquerygetStrategyState(){
  yield takeEvery('todos/getStrategyState',get_strategy_state);//
}
function* watchquerygetEventNews(){
  yield takeEvery('todos/getEventNews',get_event_news);
}
function* watchquerygetMonitorResources(){
  yield takeEvery('todos/getMonitorResources',get_monitor_resources);
}


export default function* () {

  yield fork(watchAllTasks);
  yield fork(watchGetIdcList);
  yield fork(watchAddMonitor);
  yield fork(watchGetTask);
  yield fork(watchPutTask);
  yield fork(watchGetTaskCharts);
  yield fork(watchGetMetricCharts);
  yield fork(watchDeleteTask);
  yield fork(watchGetProjects);
  yield fork(watchAddAlarmUser);
  yield fork(watchGetAlarmUser);
  yield fork(watchGetAlarmEvent);
  // yield fork(watchGetMetrics);
  yield fork(watchCreateAlarmStrategy);
  yield fork(watchGetAlarmStrategies);
  yield fork(watchDeleteAlarmStrategy);
  yield fork(watchToggleAlarmStrategy);
  yield fork(watchGetAlarmStrategy);
  yield fork(watchUpdateAlarmStrategy);
  yield fork(watchGetQdmIndexData);
  yield fork(watchGetQdmIndexAlarmLog);
  yield fork(watchGetQdmLinkTasks);
  yield fork(watchGetQdmLinkTasksToponodes);
  yield fork(watchGetQdmLinkTaskStratistics);
  yield fork(watchGetQdmIdcTasks);
  yield fork(watchGetQdmIdcTaskStratistics);
  yield fork(watchGetQdmServerTasks);
  yield fork(watchGetQdmServerTaskStratistics);
  yield fork(watchGetQdmServerQueryMetrics);
  yield fork(watchGetQdmServerQueryMetricsHistory);
  yield fork(watchAddNewChannel);
  yield fork(watchQueryTmpBroadcastList);
  yield fork(watchDeleteTmpBroadcastList);
  yield fork(watchqueryTmpbroadcastSummary);
  yield fork(watchquerygetlatestdata);

  yield fork(watchquerygetStrategyState);
  yield fork(watchquerygetEventNews);
  yield fork(watchquerygetMonitorResources);
  // Load todos.
  yield put({
    type: 'todos/getIdc',
  });
  // yield put({
  //   type: 'todos/getProjects',
  // });
  yield put({
    type:'todos/getStrategyState',
  });
  yield put({
    type:'todos/getEventNews',
  });
  yield put({
    type:'todos/getMonitorResources',
  });
}
