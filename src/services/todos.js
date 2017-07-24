import xFetch from './xFetch';

var Cookie=new Object();
Cookie.setCookie=function(name, value, option){
    var str=name+'='+escape(value);
    if(option){
        if(option.expireHours){
            var d=new Date();
            d.setTime(d.getTime()+option.expireHours*3600*1000);
            str+='; expires='+d.toGMTString();
        }
        if(option.path) str+='; path=/';
        if(option.domain) str+='; domain='+option.domain;
        if(option.secure) str+='; true';
    }
    document.cookie=str;
}
Cookie.getCookie=function(name){
    var arr = document.cookie.split('; ');
    if(arr.length==0) return '';
    for(var i=0; i <arr.length; i++){
        var tmp = arr[i].split('=');
        if(tmp[0]==name) return unescape(tmp[1]);
    }
    return '';
}
Cookie.delCookie=function(name){
    this.setCookie(name,'',{expireHours:-1});
}

const token = Cookie.getCookie("token");

const GetOption = {
  headers: {
    'Cache-Control': 'no-cache',
    'Content-type': 'application/json',
    'token': token
  },
  method: 'GET',
};

function checktoken() {
  if(Cookie.getCookie("token") == '') {
    // window.location.href = '/';
  }
}

/*
 * 获得监控项
 */
export async function getAllTasks(type) { // 获得所有检测项数据
  checktoken();
  if(type == 'all'){
    return xFetch('/qsm/api/v1/tasks', GetOption);
  }else if(type == 'PING' || type == 'HTTP' || type == 'DNS' || type == 'TCP'){
    return xFetch('/qsm/api/v1/tasks?type=' + type, GetOption);
  }else{
    return xFetch('/qsm/api/v1/projects/' + type +'/users/tasks', GetOption);
  }
}

export async function getTask(id) { // 获得指定id的检测项数据
  checktoken();
  return xFetch('/qsm/api/v1/tasks/' + id, GetOption);
}

/*
 * 修改监控项
 */
export async function putPingTask(project_id, task_name, target, period, nodes, type, task_id) { // 修改ping的检测项
  checktoken();
  const jsonResult = {
    'project_id': project_id,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'type': type
  };
  const data = JSON.stringify(jsonResult);
  return xFetch('/qsm/api/v1/tasks/' + task_id, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'PUT',
    body: (data)
  });
}

export async function putDnsTask(project_id, task_name, target, period, nodes, type, task_id) { // 修改DNS的检测项
  checktoken();
  const jsonResult = {
    'project_id': project_id,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'type': type
  };
  const data = JSON.stringify(jsonResult);
  return xFetch('/qsm/api/v1/tasks/' + task_id, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'PUT',
    body: (data)
  });
}

export async function putHttpTask(project_id, task_name, target, period, nodes, method, type, task_id, maxredirs, cookies, headers, body) { // 修改http的检测项
  checktoken();
  const jsonResult = {
    'project_id': project_id,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'method': method,
    'type': type,
    'maxredirs': maxredirs,
  };

  if(cookies != '') {
    jsonResult.cookies = cookies;
  }

  if(headers.length > 0) {
    jsonResult.headers = headers;
  }

  if(body != '') {
    jsonResult.body = body;
  }

  const data = JSON.stringify(jsonResult);
  return xFetch('/qsm/api/v1/tasks/' + task_id, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'PUT',
    body: (data)
  });
}
export async function putTcpTask(project_id, task_name, target, period, nodes, port, type, task_id) { // 修改tcp的检测项
  checktoken();
  const jsonResult = {
    'project_id': project_id,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'port': port,
    'type': type
  };
  const data = JSON.stringify(jsonResult);
  return xFetch('/qsm/api/v1/tasks/' + task_id, {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'PUT',
    body: (data)
  });
}

/*
 * 获取所有idc列表
 */
export async function getIdcList() {
  checktoken();
  // return xFetch('/qsm/api/v1/nodes', {
  //   headers: {
  //     'Cache-Control': 'no-cache',
  //     'Content-type': 'application/json',
  //     'token': token
  //   }
  // });
  return xFetch('/qsm/api/v1/nodes/types/all', {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    }
  });
}

/*
 * 新增监控项
 */
export async function addPing(type, task_name, target, period, nodes, project_id) { // 新增ping检测项
  checktoken();
  const jsonResult = {
    'type': type,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'project_id': project_id
  };
  const data = JSON.stringify(jsonResult);
  return xFetch('/qsm/api/v1/tasks', {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  });
}
export async function addHttp(type, task_name, target, period, nodes, method, project_id, cookies, headers, body, maxredirs) { // 新增http检测项
  checktoken();
  const jsonResult = {
    'type': type,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'method': method,
    'project_id': project_id,
    'maxredirs': maxredirs,
  };

  if(cookies != '') {
    jsonResult.cookies = cookies;
  }

  if(headers.length > 0) {
    jsonResult.headers = headers;
  }

  if(body != '') {
    jsonResult.body = body;
  }

  const data = JSON.stringify(jsonResult);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qsm/api/v1/tasks', option);
}
export async function addDns(type, task_name, target, period, nodes, project_id) { // 新增DNS检测项
  checktoken();
  const jsonResult = {
    'type': type,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'project_id': project_id
  };
  const data = JSON.stringify(jsonResult);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qsm/api/v1/tasks', option);
}
export async function addTcp(type, task_name, target, period, nodes, port, project_id) { // 新增tcp检测项
  checktoken();
  const jsonResult = {
    'type': type,
    'task_name': task_name,
    'target': target,
    'period': period,
    'nodes': nodes,
    'port': port,
    'project_id': project_id
  };
  const data = JSON.stringify(jsonResult);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qsm/api/v1/tasks', option);
}

/*
 * 删除监控项
 */
export async function deleteTask(project_id) {
  checktoken();
  const jsonResult = {
    'project_id': project_id
  };
  const data = JSON.stringify(jsonResult);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'DELETE',
    body: (data)
  };
  return xFetch('/qsm/api/v1/tasks/' + project_id, option);
}
/*
*获得监控详情页面的charts坐标数据
*/
export async function getTaskCharts(task_id, start, end, node_ip, need_avg){
  checktoken();
  const jsonResult = {
    'task_id': task_id,
    'start': start,
    'end': end,
    'nodes_ip': node_ip,
    'need_avg': need_avg
  };
  var _url = '/qsm/api/v1/tasks/'+task_id+'/statistics?need_avg=' + need_avg;
  if(start) {
    _url += '&start=' + start;
  }
  if(end) {
    _url += '&end=' + end;
  }
  if(node_ip) {
    _url += '&nodes_ip=' + node_ip;
  }
  const data = JSON.stringify(jsonResult);
  return xFetch(_url,GetOption);
}
/*
*获得监控详情页面的charts显示数据名称
*/
export async function getMetricCharts(task_type){
  checktoken();
  return xFetch('/qsm/api/v1/metrics/'+task_type, GetOption);
}
/*
* 2017/3/10 zytao
* 告警事件
*/
export async function getAlarmEvent(task_id,event_type,start,end){
   checktoken();
   var _url='/qsm/api/v1/tasks/'+task_id+'/events';
   if(event_type){
      if(event_type!=''){
        _url += '?event_type='+event_type;
      }
      if(start){
        _url += '&start='+start;
       }if(end){
        _url += '&end='+end;
       }
   } else {
      if(start){
        _url += '?start='+start;
       }if(end){
        _url += '&end='+end;
       }
   }
        return xFetch(_url,GetOption);

}

/*
 * 返回所有的用户项目列表
 */
export async function getProjects(){
  checktoken();
  return xFetch('/qsm/api/v1/projects', GetOption);
}

/*
 * 添加报警对象用户列表
 */
export async function addAlarmUser(user){
  checktoken();
  const data = JSON.stringify(user);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qsm/api/v1/notify/parties', option);
}

/*
 * 获得报警对象用户列表
 */
export async function getAlarmUser(){
  checktoken();
  return xFetch('/qsm/api/v1/notify/parties', GetOption);
}

/*
 * 获得metrics列表
 */
// export async function getMetrics(task_type){
//   checktoken();
//   return xFetch('/qsm/api/v1/metrics/'+task_type, GetOption);
// }

/*
 * 创建报警对象
 */
export async function createAlarm(values){
  checktoken();
  const data = JSON.stringify(values);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qsm/api/v1/alarm/strategies', option);
}

/*
 * 查询具体监控项的所有告警策略
 */
export async function getAlarmStrategies(task_id){
  checktoken();
  return xFetch('/qsm/api/v1/tasks/'+ task_id +'/alarm/strategies', GetOption);
}

/*
 * 删除报警策略
 */
export async function deleteAlarmStrategy(task_id, alarm_strategy_id){
  checktoken();
  const jsonResult = {
    'task_id': task_id,
  };
  const data = JSON.stringify(jsonResult);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'DELETE',
    body: (data)
  };
  return xFetch('/qsm/api/v1/alarm/strategies/'+ alarm_strategy_id +'', option);
}

/**
 * 报警策略打开关闭接口
 */
export async function toggleAlarmStrategy(task_id, alarm_strategy_id, pause){
  checktoken();
  const jsonResult = {
    'task_id': task_id,
    'pause': pause,
  };
  const data = JSON.stringify(jsonResult);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qsm/api/v1/alarm/strategies/'+ alarm_strategy_id +'/pause', option);
}

/*
 * 修改报警策略时，查询某一个具体的报警策略
 */
export async function getAlarmStrategy(alarm_strategy_id){
  checktoken();
  return xFetch('/qsm/api/v1/alarm/strategies/'+ alarm_strategy_id +'', GetOption);
}

/*
 * 修改报警策略
 */
export async function updateAlarmStrategy(values){
  checktoken();
  const alarm_strategy_id = values.alarm_strategy_id;
  const data = JSON.stringify(values);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'PUT',
    body: (data)
  };
  return xFetch('/qsm/api/v1/alarm/strategies/'+ alarm_strategy_id +'', option);
}

/**********************************************************************************/

/*
 * 获得qdm首页所需数据
 */
export async function getQdmIndexData(topo_id){
  checktoken();
  return xFetch('/qdm/api/v1/topomaps/'+ topo_id +'/summary', GetOption);
}

/*
 * 获得 qdm 首页报警日志
 */
export async function getQdmIndexAlarmLog(topomap_id, start, end, channel_detail_ids){
  checktoken();
  if(channel_detail_ids.length > 0) {
      var channel_detail_idstr = '';
      channel_detail_ids.map(function(item, index) {
        if(index == channel_detail_ids.length-1) {
          channel_detail_idstr += item.id;
        } else {
          channel_detail_idstr += item.id + ",";
        }
      });
      if(typeof(start) != 'undefined'){
        return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/alarmlog/bytime?start='+start+'&end='+end+'&channel_detail_id=' + channel_detail_idstr + '', GetOption);
      }else{
        return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/alarmlog/latest?count=15', GetOption);
      } 
  } else {
      if(typeof(start) != 'undefined'){
        return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/alarmlog/bytime?start='+start+'&end='+end+'', GetOption);
      }else{
        return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/alarmlog/latest?count=15', GetOption);
      } 
  }
}

/*
 * 获得 qdm 网络链路二级页面数据
 */
export async function getQdmLinkTasks(topomap_id, src_ip, dst_ip, status, offset, row, toponode_id){
  checktoken();
  if(typeof(src_ip) != 'undefined' && typeof(dst_ip) != 'undefined'){
    return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/linktasks/list?status='+status+'&offset='+offset+'&row='+row+'&src_ip='+src_ip+'&dst_ip='+dst_ip+'', GetOption);
  }else{
    return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/linktasks/list?status='+status+'&offset='+offset+'&row='+row+'&toponode_id='+toponode_id+'', GetOption);
  }  
}

/*
 * 获得 qdm 二级页面的业务环节 
 */
export async function getQdmLinkTasksToponodes(topomap_id, toponode_type){
  checktoken();
  return xFetch('/qdm/api/v1/topomaps/'+ topomap_id +'/toponodes?toponode_type='+toponode_type+'', GetOption);
}

/*
 * 获得 qdm 网络链路三级页面的详情数据
 */
export async function getQdmLinkTaskStatistics(task_id, start, end){
  checktoken();
  return xFetch('/qdm/api/v1/linktasks/statistics?task_id='+task_id+'&start='+start+'&end='+end+'', GetOption);
}

/*
 * 获得 qdm 专线流量的二级页面数据
 */
export async function getQdmIdcTasks(topomap_id, offset, row, toponode_id, status){
  checktoken();
  return xFetch('/qdm/api/v1/topomaps/'+topomap_id+'/idctasks/list?offset='+offset+'&row='+row+'&toponode_id='+toponode_id+'&status='+status, GetOption);
}

/*
 * 获得 qdm 专线流量的三级页面的详细数据
 */
export async function getQdmIdcTaskStatistics(task_id, start, end){
  checktoken();
  return xFetch('/qdm/api/v1/idctasks/statistics?task_id='+task_id+'&start='+start+'&end='+end+'', GetOption)
}

/*
 * 获得 qdm 基础服务器二级页面数据
 */
export async function getQdmServerTasks(topomap_id, offset, row, toponode_id, private_ip, status){
  checktoken();
  if(private_ip&&typeof(private_ip) != 'undefined'){
    return xFetch('/qdm/api/v1/topomaps/'+topomap_id+'/servertasks/list?offset='+offset+'&row='+row+'&private_ip='+private_ip+'&status=' + status, GetOption);  
  }else{
    return xFetch('/qdm/api/v1/topomaps/'+topomap_id+'/servertasks/list?offset='+offset+'&row='+row+'&toponode_id='+toponode_id+'&status=' + status, GetOption);
  }  
}

/*
 * 获得 qdm 基础服务器三级页面的详细数据
 */
export async function getQdmServerTaskStatistics(task_id, start, end){
  checktoken();
  return xFetch('/qdm/api/v1/servertasks/statistics?task_id='+task_id+'&start='+start+'&end='+end+'', GetOption);
}

/*
 * 获得 qdm 更多指标的详细数据
 */
export async function getQdmServerQueryMetrics(ip){
  checktoken();
  return xFetch('/qdm/api/v1/query_metrics?ip='+ip+'', GetOption);
}

/*
 * 获得 qdm 更多指标的历史数据
 */
export async function getQdmServerQueryMetricsHistory(itemid, server, value_type, start, end){
  checktoken();
  return xFetch('/qdm/api/v1/query_metric_history?itemid='+itemid+'&server='+server+'&value_type='+value_type+'&start='+start+'&end='+end+'', GetOption);
}

/*
 * 添加临时直播
 */
 export async function addNewChannel(channel_id){
  checktoken();
  const values = {
    "channel_id": parseInt(channel_id.channel_id)
  };
  const data = JSON.stringify(values);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'POST',
    body: (data)
  };
  return xFetch('/qdm/api/v1/tmp_broadcast', option);
}

/*
 * 查询临时直播列表
 */
 export async function queryTmpBroadcastList(){
  checktoken();
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'GET',
  };
  return xFetch('/qdm/api/v1/tmp_broadcast', option);
}

/*
 * 删除临时直播
 */
 export async function deleteTmpBroadcastList(channel_detail_id){
  checktoken();
  const values = {
    "channel_detail_id": channel_detail_id.channel_detail_id
  };
  const data = JSON.stringify(values);
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'DELETE',
    body: (data)
  };
  return xFetch('/qdm/api/v1/tmp_broadcast', option);
}

/*
 * 查询临时直播拓扑统计数据
 */
 export async function queryTmpSummaryData(channel_detail_ids){
  checktoken();
  var channel_detail_idstr = '';
  channel_detail_ids.channel_detail_ids.map(function(item, index) {
    if(index == channel_detail_ids.channel_detail_ids.length-1) {
      channel_detail_idstr += item.id;
    } else {
      channel_detail_idstr += item.id + ",";
    }
  });
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'GET',
  };
  return xFetch('/qdm/api/v1/tmp_broadcast/summary?channel_detail_id='+channel_detail_idstr, option);
}


 export async function getLatestData(task_id){
  checktoken();
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'GET',
  };
  return xFetch('/qsm/api/v1/tasks/'+task_id+'/statistics/latest', option);
}


export async function getStrategyState(){   //dashboard页面；实时告警策略状态
  checktoken();
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'GET',
  };
  return xFetch('/qsm/api/v1/dashboard/alarm_strategies', option);

}

export async function getEventNews(){   //dashboard页面；最新告警事件消息
  checktoken();
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'GET',
  };
  return xFetch('/qsm/api/v1/dashboard/events', option);

}

export async function getMonitorResources(){ //dashboard页面；監控資源
  checktoken();
  const option = {
    headers: {
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json',
      'token': token
    },
    method: 'GET',
  };
  return xFetch('/qsm/api/v1/dashboard/tasks', option);
}