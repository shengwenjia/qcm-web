// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {

  '/qsm/api/v1/tasks': function(req, res) {
    setTimeout(function() {
      res.json({
        code: "0",
        msg: '',
        // success: true,
        data: {
          tasks: [{
            "task_id": "xxx-1",
            "task_name": "ping_t",
            "user_id": "zjd",
            "project_id": "pro-abc",
            "type": "PING",
            "nodes_count":2,
            "target": "www.iqiyi.com",
            "period": 300,
            "last_monitor_status": -1,
            "last_response_time": null
          }, {
            "task_id": "xxx-3",
            "task_name": "http_a",
            "user_id": "zjd",
            "project_id": "pro-abc",
            "type": "HTTP",
            "nodes_count":2,
            "target": "http://www.baidu.com",
            "period": 600,
            "last_monitor_status": 0,
            // "last_response_time": {
            //   "max": 1211,
            //   "min": 123,
            //   "avg": 563
            // }
            "last_response_time": 20.07890
          }, {
            "task_id": "xxx-4",
            "task_name": "tcp_a",
            "user_id": "zjd",
            "nodes_count":2,
            "project_id": "pro-abc",
            "type": "TCP",
            "target": "www.baidu.com",
            "period": 600,
            "last_monitor_status": 2,
            // "last_response_time": {
            //   "max": 1211,
            //   "min": 123,
            //   "avg": 563
            // }
            "last_response_time": 20.07890
          }, {
            "task_id": "xxx-5",
            "task_name": "dns_a",
            "user_id": "zjd",
            "project_id": "pro-abc",
            "type": "DNS",
            "nodes_count":2,
            "target": "www.baidu.com",
            "period": 600,
            "last_monitor_status": 3,
            // "last_response_time": {
            //   "max": 1211,
            //   "min": 123,
            //   "avg": 563
            // }
            "last_response_time": null
          }]
        }
      });
    }, 500);
  },
  '/qsm/api/v1/projects/:project_id/users/tasks': function(req, res) {
    setTimeout(function() {
      res.json({
        code: "0",
        msg: '',
        // success: true,
        data: {
          tasks: [{
            "task_id": "xxx-1",
            "task_name": "ping_t",
            "user_id": "zjd",
            "project_id": "pro-abc",
            "type": "PING",
            "target": "www.iqiyi.com",
            "period": 300,
            "last_monitor_status": -1,
            "last_response_time": null
          }]
        }
      });
    }, 500);
  },

  // '/api/v1/tasks/:task_id': function(req, res) {
  //   setTimeout(function() {
  //     res.json({
  //       "code": "0",
  //       "msg": "",
  //       "data": {
  //         "task_id": "xxx-1"
  //       }
  //     });
  //   }, 500);
  // },  

  '/qsm/api/v1/tasks/:task_id': function(req, res) {
    setTimeout(function() {
      res.json({
        // success: true,
        "code": "0",
        "msg": "",
         "data": {
          "task": {
            "port": 80,
            "task_id": "021a1c2dd9d34e61b4f0f0811e9eeb6c",
            "parameters": {
              "cookies": null,
              "method": "GET"
            },
            "period": 300,
            "project": {
              "project_name": "奇目",
              "project_id": 1430
            },
            "task_name": "qim",
            "nodes": [
              {
                "name": "内外网都有假探测点，别选啊",
                "zone": "zone",
                "province_cn": "上海",
                "sp_cn": "电信",
                "city_cn": "上海",
                "zone_cn": "华东",
                "node_id": "6be02b6e451b4dcb9a18f3e363f34xxx",
                "coordinate": "1,1",
                "idc": "idc"
              },
              {
                "name": "朱剑冬的探测点10.110.23.165",
                "zone": "zhd",
                "province_cn": "北京",
                "sp_cn": "电信",
                "city_cn": "北京",
                "zone_cn": "华东",
                "node_id": "6be02b6e451b4dcb9a18f3e363f34cad",
                "coordinate": "116.4135,39.9110",
                "idc": "zhejiang6_cmnet"
              }             
            ],
            "parameters": {"body": "a=b&b=b", "headers": ["Content-Type:application/json"], "cookies": "token=d906b69209d9de92789fcd65a1a5d210; pvid=954970634; flv=10.0", "method": "post", "maxredirs": 5},
            "type": "HTTP",
            "target": "http://qim.qiyi.domain"
          }
        }
      });
    }, 1000);
  },

  // '/api/v1/tasks/:type': function(req, res) {
  //   setTimeout(function() {
  //     res.json({
  //       "code": "0",
  //       "msg": "",
  //       "data": {
  //         "task_id": "xxx-1"
  //       }
  //     });
  //   }, 1000);
  // },

  // '/api/v1/tasks/:task_id': function(req, res) {
  //   setTimeout(function() {
  //     res.json({
  //       "code": "0",
  //       "msg": "DELETE TASK SUCCESS",
  //       "data": {
  //       }
  //     });
  //   }, 2000);
  // },

  // '/qsm/api/v1/nodes': function(req, res) {
  //   setTimeout(function() {
  //     res.json({
  //       "code": "0",
  //       "msg": "",
  //       "data": {
  //         "nodes": [
  //           {
  //             "name": "朱剑冬的探测点10.110.23.165",
  //             "zone": "zhd",
  //             "node_ip": "10.110.23.165",
  //             "sp_cn": "电信",
  //             "province_cn": "北京",
  //             "city_cn": "北京",
  //             "zone_cn": "华东",
  //             "node_id": "6be02b6e451b4dcb9a18f3e363f34cad",
  //             "coordinate": "120.1617,30.2801",
  //             "idc": "idc_zhujiandong_test"
  //           },
  //           {
  //             "name": "朱剑冬的探测点10.77.34.132",
  //             "zone": "zhd",
  //             "node_ip": "10.77.34.132",
  //             "sp_cn": "移动",
  //             "province_cn": "浙江",
  //             "city_cn": "杭州",
  //             "zone_cn": "华东",
  //             "node_id": "4f03eb1f4ccc480f9542a123b83bd5cc",
  //             "coordinate": "120.1617,30.2801",
  //             "idc": "idc_zhujiandong_test"
  //           },
  //           {
  //               "name": "朱剑冬的探测点10.77.34.134",
  //               "zone": "zhd",
  //               "node_ip": "10.77.34.132",
  //               "sp_cn": "移动",
  //               "province_cn": "广东",
  //               "city_cn": "杭州",
  //               "zone_cn": "华东",
  //               "node_id": "4f03eb1f4ccc480f9542a123b83bd654",
  //               "coordinate": "120.1617,30.2801",
  //               "idc": "idc_zhujiandong_test"
  //             },
  //             {
  //               "name": "朱剑冬的探测点10.77.34.135",
  //               "zone": "zhd",
  //               "node_ip": "10.77.34.132",
  //               "sp_cn": "移动",
  //               "province_cn": "黑龙江",
  //               "city_cn": "杭州",
  //               "zone_cn": "华东",
  //               "node_id": "4f03eb1f4ccc480f9542a123b83bd700",
  //               "coordinate": "120.1617,30.2801",
  //               "idc": "idc_zhujiandong_test"
  //             },
  //             {
  //               "name": "朱剑冬的探测点10.77.34.136",
  //               "zone": "zhd",
  //               "node_ip": "10.77.34.132",
  //               "sp_cn": "移动",
  //               "province_cn": "河南",
  //               "city_cn": "杭州",
  //               "zone_cn": "华东",
  //               "node_id": "4f03eb1f4ccc480f9542a123b83bd720",
  //               "coordinate": "120.1617,30.2801",
  //               "idc": "idc_zhujiandong_test"
  //             },
  //             {
  //               "name": "朱剑冬的探测点10.77.34.137",
  //               "zone": "zhd",
  //               "node_ip": "10.77.34.132",
  //               "sp_cn": "移动",
  //               "province_cn": "上海",
  //               "city_cn": "杭州",
  //               "zone_cn": "华东",
  //               "node_id": "4f03eb1f4ccc480f9542a123b83bd730",
  //               "coordinate": "120.1617,30.2801",
  //               "idc": "idc_zhujiandong_test"
  //             }
  //         ],
  //       }
  //     });
  //   }, 500);
  // },

  '/qsm/api/v1/nodes/types/:type': function(req, res){
    setTimeout(function() {
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "node": {
            "both": [
              {
                "name": "内外网都有假探测点，别选啊",
                "zone": "zone",
                "province_cn": "上海",
                "sp_cn": "电信",
                "city_cn": "上海",
                "zone_cn": "华东",
                "node_id": "6be02b6e451b4dcb9a18f3e363f34xxx",
                "coordinate": "1,1",
                "idc": "idc"
              }
            ],
            "private_only": [
              {
                "name": "朱剑冬的探测点10.110.23.165",
                "zone": "zhd",
                "province_cn": "北京",
                "sp_cn": "电信",
                "city_cn": "北京",
                "zone_cn": "华东",
                "node_id": "6be02b6e451b4dcb9a18f3e363f34cad",
                "coordinate": "116.4135,39.9110",
                "idc": "zhejiang6_cmnet"
              },
              {
                "name": "朱剑冬的探测点10.77.34.132",
                "zone": "zhd",
                "province_cn": "浙江",
                "sp_cn": "世纪互联",
                "city_cn": "杭州",
                "zone_cn": "华东",
                "node_id": "4f03eb1f4ccc480f9542a123b83bd5cc",
                "coordinate": "120.1617,30.2801",
                "idc": "beijing2_21vianet"
              }
            ],
            "public_only": [
              {
                "name": "只有外网假探测点2，别选啊",
                "zone": "zone",
                "province_cn": "河南",
                "sp_cn": "电信",
                "city_cn": "上海",
                "zone_cn": "区域",
                "node_id": "xxx",
                "coordinate": "1,1",
                "idc": "idc"
              }
            ]
          }
        }
      });      
    }, 500);
  },

  // '/qsm/api/v1/projects': function(req, res) {
  //   setTimeout(function() {
  //     res.json({
  //       "code": 0,
  //       "msg": "",
  //       "data": {
  //         "projects": [{
  //           "project_id": "pro-e1whtab",
  //           "project_name": "zjd_project",
  //         }, {
  //           "project_id": "pro-escccxx",
  //           "project_name": "我的项目aa",
  //         }]
  //       }
  //     });
  //   }, 500);
  // },
  '/qsm/api/v1/projects': function(req, res){ // 获取网站分类列表
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "projects": [
            {
              "project_name": "即时探测系统",
              "en_name": "sysnet-qrd",
              "project_id": 1431,
              "description": "支持Http，Ping，Dns，TraceRoute、Idc链路质量\r\n支持对比探测功能，可两个网站同时进行比较探测\r\n基于反向即时检测服务体系完成更多应用场景"
            },
            {
              "project_name": "奇目",
              "en_name": "sysnet-qim",
              "project_id": 1430,
              "description": "奇目基础架构监控\r\n告警，监控和报告项目体系包含三大体系"
            }
          ]
        }
      });
    }, 500)
  },

  '/qsm/api/v1/notify/parties': function(req, res) {
    setTimeout(function() {
      res.json({
        "code": 0,
        "msg": "",
        "data": {
          "notify_parties": [
            {
              "notify_party_id": "xxx",
              "name": "n1",
              "email": "zjd@aa.com",
              "mobile": "18202930113",
              "username": 'adfasf',
            },
            {
              "notify_party_id": "zzz",
              "name": "sdf",
              "email": "zjd2@aa.com",
              "mobile": "18392975648",
              "username": 'adfasf',
            }
          ]
        }
      });
    }, 500);
  },

  '/qsm/api/v1/alarm/strategies': function(req, res) {
    setTimeout(function() {
      res.json({
        "code": 0,
        "msg": "",
        "data": {
          "alarm_strategy_id": "xxx-1"
        }
      });
    }, 500);
  },

  // '/qsm/api/v1/tasks/:task_id/metrics': function(req, res) {
  //   setTimeout(function() {
  //     res.json({
  //       "msg": "", "code": 0, "data": {"metrics": [{"metric": "qsm.custom.ping.response", "name": "\u54cd\u5e94\u65f6\u95f4"}]}
  //     });
  //   }, 500);
  // },

  '/qsm/api/v1/metrics/:task_type': function(req, res) {
    setTimeout(function() {
      res.json({
        "msg": "", "code": 0, "data": {"metrics": [{"metric": "qsm.custom.ping.response", "name": "\u54cd\u5e94\u65f6\u95f4"}]}
      });
    }, 500);
  },

  '/qsm/api/v1/tasks/:task_id/alarm/strategies': function(req, res) {
    setTimeout(function() {
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "alarm_strategies": [
              {
              "notification_id": "27d62773b3914117b83b0ff0f70820f7",
              "alarm_actions": [
                "邮件"
              ],
              "counting_operator": ">",
              "alarm_email": 1,
              "alarm_name": "test_alarm_strategy_03",
              "alarm_strategy_id": "ef0fb22f6fc046aa98a61779f8e513fa",
              "counting_threshold": 999,
              "evaluation_period": 2,
              "alarm_status": 0,
              "strategy_description": "response(avg) > 999ms",
              "counting_method": "avg",
              "alarm_pause": 1,
              "alarm_sms": 0,
              "counting_metric": "qsm.custom.ping.response",
              "counting_period": 300
            },
            {
              "notification_id": "27d62773b3914117b83b0ff0f70820f7",
              "alarm_actions": [
                "邮件",
                "短信"
              ],
              "counting_operator": ">",
              "alarm_email": 1,
              "alarm_name": "test_alarm_strategy_03",
              "alarm_strategy_id": "ef0fb22f6fc046aa98a61779f8e513fa",
              "counting_threshold": 999,
              "evaluation_period": 2,
              "alarm_status": 1,
              "strategy_description": "response(avg) > 999ms",
              "counting_method": "avg",
              "alarm_pause": 0,
              "alarm_sms": 0,
              "counting_metric": "qsm.custom.ping.response",
              "counting_period": 300
            }
          ]
        }
      });
    }, 500);
  },

  // '/api/v1/alarm/strategies/:alarm_strategy_id': function(req, res){ // 删除报警策略所需的模拟数据
  //   setTimeout(function(){
  //     res.json({
  //       "msg": "ok",
  //       "code": 0,
  //       "data": {
  //         "task_id": "xxx",
  //         "alarm_strategy_id": "xxx"
  //       }
  //     });
  //   },500);
  // },

  '/qsm/api/v1/alarm/strategies/:alarm_strategy_id/pause': function(req, res){ // 报警屏蔽开启接口
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {}
      });
    }, 500);
  },

  '/qsm/api/v1/alarm/strategies/:alarm_strategy_id': function(req, res){ // 修改时查询报警策略所需的模拟数据
    setTimeout(function(){
      res.json({
        "msg": "",
        "code": 0,
        "data": {
          "alarm_strategy": {
            "counting_operator": "<",
            "notification": [
              {
                "notification_id": "085ef2b5092f414f80dff6780ad4e728",
                "alarm_sms": 1,
                "alarm_email": 1,
                "ok_sms": 0,
                "ok_email": 1
              }
            ],
            "alarm_name": "test_alarm_strategy_05",
            "alarm_strategy_id": "851f6590e80c4d32b5f2cc4f1766d681",
            "counting_threshold": 999,
            "evaluation_period": 3,
            "alarm_status": "ok",
            "notify_party": [
              {
                "mobile": "18918918989",
                "email": "n1@qiyi.com",
                "notify_party_id": "8c59fb461bbe4ea2aaac23a8ddd6da87",
                "name": "n1"
              },
              {
                "mobile": "18312309876",
                "email": "sdf@qiyi.com",
                "notify_party_id": "f6c06a86c8844a6da22c4757d9395c37",
                "name": "sdf"
              }
            ],
            "counting_method": "avg",
            "alarm_pause": 1,
            "counting_metric": "qsm.custom.ping.response",
            "counting_period": 300
          }
        }
      });
    }, 500)
  },

  // '/api/test_pdm/:topo_id': function(req, res){
  '/qdm/api/v1/topomaps/:topo_id/summary': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "toponodes_alarm_summary": [
            {
              "total_ip_count": 3,
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 18,
              "task_disable_count": 0,
              "alarm_total_count": 18,
              "item_error_count": 0,
              "toponode_type": "servertask",
              "error_ip_count": 0,
              "error_ip_list": [],
              "toponode_id": 11
            },
            {
              "total_ip_count": 17,
              "task_total_count": 17,
              "alarm_error_count": 0,
              "task_enable_count": 17,
              "alarm_ok_count": 102,
              "task_disable_count": 0,
              "alarm_total_count": 102,
              "item_error_count": 0,
              "toponode_type": "servertask",
              "error_ip_count": 0,
              "error_ip_list": [],
              "toponode_id": 12
            },
            {
              "total_ip_count": 67,
              "task_total_count": 67,
              "alarm_error_count": 1,
              "task_enable_count": 67,
              "alarm_ok_count": 402,
              "task_disable_count": 0,
              "alarm_total_count": 402,
              "item_error_count": 0,
              "toponode_type": "servertask",
              "error_ip_count": 1,
              "error_ip_list": [],
              "toponode_id": 13
            },
            {
              "total_ip_count": 46,
              "task_total_count": 46,
              "alarm_error_count": 0,
              "task_enable_count": 46,
              "alarm_ok_count": 276,
              "task_disable_count": 0,
              "alarm_total_count": 276,
              "item_error_count": 0,
              "toponode_type": "servertask",
              "error_ip_count": 0,
              "error_ip_list": [],
              "toponode_id": 14
            },
            {
              "total_ip_count": 1,
              "task_total_count": 1,
              "alarm_error_count": 0,
              "task_enable_count": 1,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "item_error_count": 0,
              "toponode_type": "servertask",
              "error_ip_count": 0,
              "error_ip_list": [],
              "toponode_id": 15
            },
            {
              "total_ip_count": 1,
              "task_total_count": 1,
              "alarm_error_count": 0,
              "task_enable_count": 1,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "item_error_count": 0,
              "toponode_type": "servertask",
              "error_ip_count": 0,
              "error_ip_list": [],
              "toponode_id": 16
            },
            {
              "task_total_count": 201,
              "alarm_error_count": 0,
              "task_enable_count": 201,
              "alarm_ok_count": 402,
              "task_disable_count": 0,
              "alarm_total_count": 402,
              "toponode_type": "linktask",
              "toponode_id": 17
            },
            {
              "task_total_count": 1139,
              "alarm_error_count": 0,
              "task_enable_count": 1139,
              "alarm_ok_count": 2278,
              "task_disable_count": 0,
              "alarm_total_count": 2278,
              "toponode_type": "linktask",
              "toponode_id": 18
            },
            {
              "task_total_count": 782,
              "alarm_error_count": 0,
              "task_enable_count": 782,
              "alarm_ok_count": 1564,
              "task_disable_count": 0,
              "alarm_total_count": 1564,
              "toponode_type": "linktask",
              "toponode_id": 19
            },
            {
              "task_total_count": 1,
              "alarm_error_count": 0,
              "task_enable_count": 1,
              "alarm_ok_count": 2,
              "task_disable_count": 0,
              "alarm_total_count": 2,
              "toponode_type": "linktask",
              "toponode_id": 20
            },
            {
              "task_total_count": 67,
              "alarm_error_count": 6,
              "task_enable_count": 67,
              "alarm_ok_count": 128,
              "task_disable_count": 0,
              "alarm_total_count": 134,
              "toponode_type": "linktask",
              "toponode_id": 21
            },
            {
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 22
            },
            {
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 23
            },
            {
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 24
            },
            {
              "task_total_count": 3,
              "alarm_error_count": 1,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 26
            }
          ],
          "summary": {
            "idctask": {
              "task_total_count": 9,
              "alarm_error_count": 0,
              "task_enable_count": 9,
              "alarm_ok_count": 18,
              "task_disable_count": 0,
              "alarm_total_count": 18
            },
            "total": {
              "task_total_count": 2334,
              "alarm_error_count": 6,
              "task_enable_count": 2334,
              "alarm_ok_count": 4527,
              "task_disable_count": 0,
              "alarm_total_count": 4533
            },
            "servertask": {
              "task_total_count": 135,
              "alarm_error_count": 0,
              "task_enable_count": 135,
              "alarm_ok_count": 135,
              "task_disable_count": 0,
              "alarm_total_count": 135
            },
            "linktask": {
              "task_total_count": 2190,
              "alarm_error_count": 6,
              "task_enable_count": 2190,
              "alarm_ok_count": 4374,
              "task_disable_count": 0,
              "alarm_total_count": 4380
            }
          }
        }
      });
    }, 500)
  },

  '/qdm/api/v1/topomaps/:topomap_id/alarmlog/latest': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
          {
            "status": "alarm",
            "task_type": "server",
            "metric": "system.cpu.load",
            "alarmlog_id": 31,
            "task_name": "测试编码机1",
            "time": 1482242583,
            "item_id": 37,
            "toponode_name": "编码机"
          },
          {
            "status": "ok",
            "task_type": "link",
            "metric": "qcm.qdm.ping.response",
            "alarmlog_id": 30,
            "task_name": "10.15.243.226-10.1.4.75",
            "time": 1482240005,
            "item_id": 29,
            "toponode_name": "编码机-rtmp_server1"
          }
        ]
      });
    }, 500)
  },

  '/qdm/api/v1/topomaps/:topomap_id/alarmlog/bytime': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
          {
            "status": "alarm",
            "task_type": "server",
            "metric": "system.cpu.load",
            "alarmlog_id": 35,
            "task_name": "测试编码机1",
            "time": 1482242583,
            "item_id": 37,
            "toponode_name": "编码机"
          },
        ]
      });
    }, 500)
  },

  '/qdm/api/v1/topomaps/:topomap_id/linktasks/list': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "total_count": 17,
          "data": [
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "-"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "error"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            },
            {
              "src_ip": "10.15.243.226",
              "status": 0,
              "task_id": "a16b4623c9ca462aa656ea5395211ecd",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.95599937438965"
            },
            {
              "src_ip": "10.77.34.132",
              "status": 0,
              "task_id": "6d6b8dab7a1944d0ad66b856f1e443f6",
              "loss": "0.0",
              "dst_ip": "10.1.4.75",
              "multi_status": "0,0",
              "response": "24.42300033569336"
            }
          ]
        }
      });
    }, 500)
  },

  '/qdm/api/v1/topomaps/:topomap_id/toponodes': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
          {
            "type": "link",
            "id": 11,
            "name": "编码机-rtmp_server1"
          },
          {
            "type": "link",
            "id": 7,
            "name": "zjd-test-bianma-to-rtmpserver"
          }
        ]
      });
    }, 500)
  },

  '/qdm/api/v1/linktasks/statistics': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
          {
            "metric": "qcm.qdm.ping.response",
            "aggregateTags": [],
            "dps": {
              "1482291480": 24.93899917602539,
              "1482291540": 10.93600082397461,
              "1482291600": 30.966999053955078
            },
            "tags": {
              "src_ip": "10.15.243.226",
              "endpoint": "10.1.4.75"
            }
          },
          {
            "metric": "qcm.qdm.ping.loss",
            "aggregateTags": [],
            "dps": {
              "1482291480": 0,
              "1482291540": 0,
              "1482291600": 0
            },
            "tags": {
              "src_ip": "10.15.243.226",
              "endpoint": "10.1.4.75"
            }
          }
        ]
      });
    }, 500)
  },

  '/qdm/api/v1/topomaps/:topomap_id/idctasks/list': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "total_count": 12,
          "data": [
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_office",
              "dst_idc": "beijing_cmnet",
              "task_id": "ca728464f5db49e3a4ecb79473638c3f",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingoffice-beijingcmnet",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_ct",
              "dst_idc": "beijing3_ct",
              "task_id": "fe7dded2b346475881f56fb64e8cb0e3",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingct-beijingct3",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_office",
              "dst_idc": "beijing_cmnet",
              "task_id": "ca728464f5db49e3a4ecb79473638c3f",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingoffice-beijingcmnet",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_ct",
              "dst_idc": "beijing3_ct",
              "task_id": "fe7dded2b346475881f56fb64e8cb0e3",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingct-beijingct3",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_office",
              "dst_idc": "beijing_cmnet",
              "task_id": "ca728464f5db49e3a4ecb79473638c3f",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingoffice-beijingcmnet",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_ct",
              "dst_idc": "beijing3_ct",
              "task_id": "fe7dded2b346475881f56fb64e8cb0e3",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingct-beijingct3",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_office",
              "dst_idc": "beijing_cmnet",
              "task_id": "ca728464f5db49e3a4ecb79473638c3f",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingoffice-beijingcmnet",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_ct",
              "dst_idc": "beijing3_ct",
              "task_id": "fe7dded2b346475881f56fb64e8cb0e3",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingct-beijingct3",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_office",
              "dst_idc": "beijing_cmnet",
              "task_id": "ca728464f5db49e3a4ecb79473638c3f",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingoffice-beijingcmnet",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_ct",
              "dst_idc": "beijing3_ct",
              "task_id": "fe7dded2b346475881f56fb64e8cb0e3",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingct-beijingct3",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_office",
              "dst_idc": "beijing_cmnet",
              "task_id": "ca728464f5db49e3a4ecb79473638c3f",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingoffice-beijingcmnet",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            },
            {
              "status": 0,
              "idc_traffic_in": "0.0",
              "src_idc": "beijing_ct",
              "dst_idc": "beijing3_ct",
              "task_id": "fe7dded2b346475881f56fb64e8cb0e3",
              "idc_traffic_out": "0.0",
              "idc_traffic_out_timestamp": 1482291600000,
              "task_name": "beijingct-beijingct3",
              "idc_traffic_in_timestamp": 1482291600000,
              "threshold": 1,
              "multi_status": "0,0"
            }
          ]
        }
      });
    }, 500)
  },

  '/qdm/api/v1/idctasks/statistics': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
          {
            "metric": "idc.traffic.in",
            "aggregateTags": [],
            "dps": {
              "1482291900": 4.145999908447266,
              "1482292200": 4.159999847412109,
              "1482292500": 4.176000118255615,
              "1482292800": 4.363999843597412,
              "1482293100": 4.735000133514404
            },
            "tags": {
              "endpoint": "beijing_cnc-beijing2_cnc",
              "task_id": "4846d0a2440e44588f4631b4d87e2e45"
            }
          },
          {
            "metric": "idc.traffic.out",
            "aggregateTags": [],
            "dps": {
              "1482291900": 3.813999891281128,
              "1482292200": 3.8580000400543213,
              "1482292500": 3.9040000438690186,
              "1482292800": 4.007999897003174,
              "1482293100": 4.168000221252441
            },
            "tags": {
              "endpoint": "beijing_cnc-beijing2_cnc",
              "task_id": "4846d0a2440e44588f4631b4d87e2e45"
            }
          }
        ]
      });
    }, 500)
  },

  '/qdm/api/v1/topomaps/:topomap_id/servertasks/list': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": {
          "total_count": 1,
          "data": [
            {
              "status": 0,
              "connections": "2.0",
              "cpuload_timestamp": 1479891413000,
              "task_id": "c4717d032427413f9d57ef0a2a21e6a2",
              "conns_timestamp": 1479891395000,
              "public_ip": null,
              "memfree_timestamp": 1479891413000,
              "_private_ip": "10.15.243.226",
              "private_ip": "10.15.243.226",
              "task_name": "测试编码机1",
              "memory_pavaliable": "72.38099670410156",
              "multi_status": "0,0,0,0,0,0",
              "cpu_load": "0.0"
            },{
              "status": 0,
              "connections": "2.0",
              "cpuload_timestamp": 1479891413000,
              "task_id": "c4717d032427413f9d57ef0a2a21e6a2",
              "conns_timestamp": 1479891395000,
              "public_ip": null,
              "memfree_timestamp": 1479891413000,
              "_private_ip": "10.15.243.105",
              "private_ip": "10.15.243.105",
              "task_name": "测试编码机1",
              "memory_pavaliable": "72.38099670410156",
              "multi_status": "0,0,0,0,0,0",
              "cpu_load": "0.0"
            }
          ]
        }
      });
    }, 500)
  },

  '/qdm/api/v1/servertasks/statistics': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
          {
            "metric": "system.cpu.load",
            "aggregateTags": [],
            "dps": {
              "1482293160": 0,
              "1482293466": 0.03999999910593033,
              "1482293772": 0,
              "1482294078": 0.18000000715255737
            },
            "tags": {
              "endpoint": "system-network-others-test-dev011-bjdxt9.qiyi.virtual",
              "ip": "10.15.243.226",
              "host_group": "ComputeCloud_OpenStack_VM",
              "sn": "816374068",
              "new_service": "computecloud_KVM",
              "idc": "beijing9_dxt"
            }
          },
          {
            "metric": "vm.memory.size",
            "aggregateTags": [],
            "dps": {
              "1482293160": 65.03900146484375,
              "1482293466": 65.1709976196289,
              "1482293772": 65.1050033569336,
              "1482294078": 65.03900146484375
            },
            "tags": {
              "a": "pavailable",
              "endpoint": "system-network-others-test-dev011-bjdxt9.qiyi.virtual",
              "ip": "10.15.243.226",
              "host_group": "ComputeCloud_OpenStack_VM",
              "sn": "816374068",
              "new_service": "computecloud_KVM",
              "idc": "beijing9_dxt"
            }
          },
          {
            "metric": "IQiyi.Network.Conns",
            "aggregateTags": [],
            "dps": {
              "1482293160": 96,
              "1482293466": 100,
              "1482293772": 96,
              "1482294078": 96
            },
            "tags": {
              "a": "empty_bracket",
              "endpoint": "system-network-others-test-dev011-bjdxt9.qiyi.virtual",
              "ip": "10.15.243.226",
              "host_group": "ComputeCloud_OpenStack_VM",
              "sn": "816374068",
              "new_service": "computecloud_KVM",
              "idc": "beijing9_dxt"
            }
          }
        ]
      });
    }, 500)
  },

  '/qdm/api/v1/query_metrics': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
            {
                "item_name": "Agent ping",
                "metric": "agent.ping",
                "lastclock": "1482912830",
                "value": "1",
                "change": "0",
                "itemid": "6670389",
                "value_type": "2",
                "server": "test_01",
            },
            {
                "item_name": "Agent ping",
                "metric": "agent.ping",
                "lastclock": "1482912830",
                "value": "1",
                "change": "0",
                "itemid": "6670390",
                "value_type": "4",
                "server": "test_02",
            }
        ]
      })
    }, 500)
  },

  '/qdm/api/v1/query_metric_history': function(req, res){
    setTimeout(function(){
      res.json({
        "msg": "ok",
        "code": 0,
        "data": [
            {
                "dps": {
                    "1482941047": "2552",
                    "1482941348": "2600",
                    "1482941649": "2584",
                    "1482941950": "2632",
                    "1482942251": "2560",
                    "1482942552": "2640",
                    "1482942854": "2568",
                    "1482943154": "2648",
                    "1482943455": "2584",
                    "1482943757": "2616",
                    "1482944057": "2592",
                    "1482944358": "2608",
                    "1482944659": "2584",
                    "1482944960": "2592",
                    "1482945262": "2600",
                    "1482945562": "2608",
                    "1482945863": "2552",
                    "1482946165": "2584",
                    "1482946465": "2584",
                    "1482946766": "2600",
                    "1482947067": "2568",
                    "1482947367": "2600",
                    "1482947668": "2584",
                    "1482947969": "2592",
                    "1482948270": "2576",
                    "1482948571": "2616",
                    "1482948871": "2608",
                    "1482949173": "2608",
                    "1482949473": "2560",
                    "1482949774": "2608",
                    "1482950075": "2608",
                    "1482950376": "2608",
                    "1482950677": "2592",
                    "1482950978": "2616",
                    "1482951279": "2568",
                    "1482951581": "2592",
                    "1482951881": "2616",
                    "1482952183": "2624",
                    "1482952483": "2568",
                    "1482952784": "2600",
                    "1482953085": "2576",
                    "1482953385": "2632",
                    "1482953686": "2608",
                    "1482953987": "2592",
                    "1482954288": "2600",
                    "1482954590": "2592",
                    "1482954890": "2592",
                    "1482955191": "2592",
                    "1482955493": "2592",
                    "1482955793": "2592",
                    "1482956094": "2608",
                    "1482956395": "2592",
                    "1482956695": "2560",
                    "1482956996": "2592",
                    "1482957297": "2616",
                    "1482957597": "2616",
                    "1482957898": "2600",
                    "1482958199": "2624",
                    "1482958500": "2584",
                    "1482958801": "2624",
                    "1482959102": "2584",
                    "1482959404": "2592",
                    "1482959704": "2600",
                    "1482960005": "2616",
                    "1482960307": "2568",
                    "1482960607": "2624",
                    "1482960908": "2568",
                    "1482961208": "2576",
                    "1482961510": "2608",
                    "1482961810": "2624",
                    "1482962111": "2576",
                    "1482962412": "2576",
                    "1482962712": "2584",
                    "1482963013": "2600",
                    "1482963314": "2616",
                    "1482963615": "2600",
                    "1482963916": "2560",
                    "1482964216": "2608",
                    "1482964517": "2592",
                    "1482964818": "2624",
                    "1482965119": "2632",
                    "1482965421": "2608",
                    "1482965721": "2560",
                    "1482966022": "2608",
                    "1482966323": "2584",
                    "1482966624": "2600",
                    "1482966925": "2600",
                    "1482967227": "2600",
                    "1482967527": "2592",
                    "1482967828": "2592",
                    "1482968129": "2608",
                    "1482968429": "2592",
                    "1482968730": "2600",
                    "1482969031": "2632",
                    "1482969332": "2616",
                    "1482969634": "2568",
                    "1482969934": "2576",
                    "1482970236": "2600",
                    "1482970536": "2616",
                    "1482970837": "2632",
                    "1482971138": "2592",
                    "1482971438": "2576",
                    "1482971740": "2616",
                    "1482972040": "2608",
                    "1482972342": "2592",
                    "1482972642": "2584",
                    "1482972943": "2600",
                    "1482973244": "2592",
                    "1482973545": "2592",
                    "1482973846": "2600",
                    "1482974147": "2600",
                    "1482974447": "2608",
                    "1482974748": "2608",
                    "1482975050": "2584",
                    "1482975350": "2600",
                    "1482975652": "2584",
                    "1482975952": "2616",
                    "1482976253": "2568",
                    "1482976554": "2624",
                    "1482976856": "2560",
                    "1482977156": "2576",
                    "1482977457": "2592",
                    "1482977759": "2568",
                    "1482978059": "2624",
                    "1482978360": "2592",
                    "1482978661": "2584",
                    "1482978961": "2584",
                    "1482979262": "2632",
                    "1482979564": "2584",
                    "1482979864": "2608",
                    "1482980165": "2616",
                    "1482980466": "2640",
                    "1482980766": "2600",
                    "1482981067": "2624",
                    "1482981368": "2600",
                    "1482981668": "2648",
                    "1482981969": "2616",
                    "1482982270": "2632"
                }
            }
        ]
      })
    }, 500)
  },

  '/qdm/api/v1/tmp_broadcast': function(req, res) {
    setTimeout(function() {
      res.json({
        "code": 0,
        "msg": "ok",
        "data": [{
          "cutter_ip": "10.10.180.61",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c15_ls_xiaqing_smooth_t10",
          "id": 18,
          "format_type": "TS"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        },
        {
          "cutter_ip": "10.10.180.62",
          "channel_name": "春晚专题直转点2",
          "encode_ip": "10.153.126.89",
          "stream_type": "SMOOTH",
          "rtmp_ip": "10.121.33.36",
          "channel_id": 180237322,
          "create_time": 1484634142,
          "cutter_name": "c12_ls_xiaqing_smooth_s10",
          "id": 17,
          "format_type": "FLV"
        }]
      });
    }, 500);
  },

  '/qdm/api/v1/tmp_broadcast/summary': function(req, res) {
    setTimeout(function() {
      res.json({
        "code": 0,
        "msg": "ok",
        "data":  {
          "toponodes_alarm_summary": {
            "idc_encode_rtmp1": {
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 22
            },
            "idc_encode_rtmp2": {
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 23
            },
            "encode_to_rtmp1": {
              "toponode_type": "linktask",
              "task_total_count": 4,
              "alarm_error_count": 0,
              "task_enable_count": 4,
              "channel_ids": [
                "1",
                "2",
                "3",
                "4"
              ],
              "alarm_ok_count": 8,
              "toponode_id": 17,
              "task_disable_count": 0,
              "alarm_total_count": 8,
              "toponode_name": "encode to rtmp1"
            },
            "idc_cutter_rtmp": {
              "task_total_count": 3,
              "alarm_error_count": 0,
              "task_enable_count": 3,
              "alarm_ok_count": 6,
              "task_disable_count": 0,
              "alarm_total_count": 6,
              "toponode_type": "idctask",
              "toponode_id": 24
            },
            "bjoa_to_bjyanboshi": {
              "toponode_type": "linktask",
              "task_total_count": 1,
              "alarm_error_count": 1,
              "task_enable_count": 1,
              "channel_ids": [],
              "alarm_ok_count": 2,
              "toponode_id": 20,
              "task_disable_count": 0,
              "alarm_total_count": 2,
              "toponode_name": "bjoa to bjyanboshi"
            },
            "cqoa_to_bjoa": {
              "toponode_type": "linktask",
              "task_total_count": 1,
              "alarm_error_count": 0,
              "task_enable_count": 1,
              "channel_ids": [],
              "alarm_ok_count": 2,
              "toponode_id": 20,
              "task_disable_count": 0,
              "alarm_total_count": 2,
              "toponode_name": "cqoa_to_bjoa"
            },
            "encode_to_rtmp": {
              "toponode_type": "linktask",
              "task_total_count": 4,
              "alarm_error_count": 0,
              "task_enable_count": 4,
              "channel_ids": [
                "1",
                "2",
                "3",
                "4"
              ],
              "alarm_ok_count": 8,
              "toponode_id": 18,
              "task_disable_count": 0,
              "alarm_total_count": 8,
              "toponode_name": "encode to trmp"
            },
            "rtmp": {
              "total_ip_count": 3,
              "error_ip_list": [],
              "error_ip_count": 1,
              "item_error_count": 0
            },
            "encode": {
              "total_ip_count": 3,
              "error_ip_list": [],
              "error_ip_count": 0,
              "item_error_count": 0
            },
            "cutter_to_rtmp": {
              "toponode_type": "linktask",
              "task_total_count": 4,
              "alarm_error_count": 0,
              "task_enable_count": 4,
              "channel_ids": [
                "1",
                "2",
                "3",
                "4"
              ],
              "alarm_ok_count": 8,
              "toponode_id": 19,
              "task_disable_count": 0,
              "alarm_total_count": 8,
              "toponode_name": "cutter to rtmp"
            },
            "bjyanboshi_to_encode": {
              "toponode_type": "linktask",
              "task_total_count": 4,
              "alarm_error_count": 2,
              "task_enable_count": 4,
              "channel_ids": [
                "1",
                "2",
                "3",
                "4"
              ],
              "alarm_ok_count": 6,
              "toponode_id": 21,
              "task_disable_count": 0,
              "alarm_total_count": 8,
              "toponode_name": "bjyanboshi to encode"
            },
            "cutter": {
              "total_ip_count": 4,
              "error_ip_list": [],
              "error_ip_count": 0,
              "item_error_count": 0
            }
          },
          "summary": {
            "idctask": {
              "task_total_count": 9,
              "alarm_error_count": 0,
              "task_enable_count": 9,
              "alarm_ok_count": 18,
              "task_disable_count": 0,
              "alarm_total_count": 18
            },
            "servertask": {
              "task_total_count": 10,
              "alarm_error_count": 0,
              "task_enable_count": 10,
              "alarm_ok_count": 10,
              "task_disable_count": 0,
              "alarm_total_count": 10
            },
            "linktask": {
              "task_total_count": 17,
              "alarm_error_count": 2,
              "task_enable_count": 17,
              "alarm_ok_count": 32,
              "task_disable_count": 0,
              "alarm_total_count": 34
            }
          }
        }
      });
    }, 500);
  },




  '/qsm/api/v1/tasks/:task_id/statistics': function(req, res) {
    setTimeout(function() {
      res.json({
        code: "0",
        msg: '',
        "data": {
    "statistics": {
      "10.77.34.132": [
        {
          "metric": "qsm.custom.ping.response",
          "aggregateTags": null,
          "dps": {
            "1488249600": 0.72,
            "1488249900": 0.721,
            "1488250200": 0.685,
            "1488250500": 0.717,
            "1488250800": 0.684,
            "1488251100": 0.674
          },
          "tags": {
            "node_id": "4f03eb1f4ccc480f9542a123b83bd5cc",
            "namespace": "qsm",
            "idc": "idc_zhujiandong_test",
            "task_id": "2d9ccd961a7b4b62be79d63938f0136d",
            "node_ip": "10.77.34.132"
          }
        },
        {
          "metric": "qsm.custom.ping.loss",
          "aggregateTags": null,
          "dps": {
            "1488249600": 0,
            "1488249900": 0,
            "1488250200": 0,
            "1488250500": 0,
            "1488250800": 0,
            "1488251100": 0
          },
          "tags": {
            "node_id": "4f03eb1f4ccc480f9542a123b83bd5cc",
            "namespace": "qsm",
            "idc": "idc_zhujiandong_test",
            "task_id": "2d9ccd961a7b4b62be79d63938f0136d",
            "node_ip": "10.77.34.132"
          }
        }
      ],
      "average": [
        {
          "metric": "qsm.custom.ping.response",
          "aggregateTags": null,
          "dps": {
            "1488249600": 1.0295,
            "1488249900": 1.0175,
            "1488250200": 1.001,
            "1488250500": 1.0375,
            "1488250800": 0.991,
            "1488251100": 1
          },
          "tags": {
            "task_id": "2d9ccd961a7b4b62be79d63938f0136d"
          }
        },
        {
          "metric": "qsm.custom.ping.loss",
          "aggregateTags": null,
          "dps": {
            "1488249600": 0,
            "1488249900": 0,
            "1488250200": 0,
            "1488250500": 0,
            "1488250800": 0,
            "1488251100": 0
          },
          "tags": {
            "task_id": "2d9ccd961a7b4b62be79d63938f0136d"
          }
        }
      ],
      "10.110.23.165": [
        {
          "metric": "qsm.custom.ping.response",
          "aggregateTags": null,
          "dps": {
            "1488249600": 1.339,
            "1488249900": 1.314,
            "1488250200": 1.317,
            "1488250500": 1.358,
            "1488250800": 1.298,
            "1488251100": 1.326
          },
          "tags": {
            "node_id": "6be02b6e451b4dcb9a18f3e363f34cad",
            "namespace": "qsm",
            "idc": "idc_zhujiandong_test",
            "task_id": "2d9ccd961a7b4b62be79d63938f0136d",
            "node_ip": "10.110.23.165"
          }
        },
        {
          "metric": "qsm.custom.ping.loss",
          "aggregateTags": null,
          "dps": {
            "1488249600": 0,
            "1488249900": 0,
            "1488250200": 0,
            "1488250500": 0,
            "1488250800": 0,
            "1488251100": 0
          },
          "tags": {
            "node_id": "6be02b6e451b4dcb9a18f3e363f34cad",
            "namespace": "qsm",
            "idc": "idc_zhujiandong_test",
            "task_id": "2d9ccd961a7b4b62be79d63938f0136d",
            "node_ip": "10.110.23.165"
          }
        }
      ]
    }
  }
      });
    }, 500);
  },




'/qsm/api/v1/metrics/:task_type': function(req, res) {
    setTimeout(function() {
      res.json({
        code: "0",
        msg: '',
       "data": {
        "metrics": [
          {
            "metric": "qsm.custom.ping.response",
            "name": "响应时间"
          },
          {
            "metric": "qsm.custom.ping.loss",
            "name": "丢包率"
          }
        ]
  }
      });
    }, 500);
  },

  '/qsm/api/v1/tasks/:task_id/statistics/latest': function(req, res) {
      setTimeout(function() {
          res.json({
            code: "0",
            msg: '',
           "data": {
              "latest_statistics": [
                {
                  "latest_data": {
                    "qsm.custom.http.response": {
                      "timestamp": 1487304600000,
                      "metric": "qsm.custom.http.response",
                      "value": "25.43400001525879"
                    },
                    "qsm.custom.http.totaltime": {
                      "timestamp": 1487304600000,
                      "metric": "qsm.custom.http.totaltime",
                      "value": "207.43499755859375"
                    }
                  },
                  "node_private_ip": "10.110.23.165",
                  "node_id": "6be02b6e451b4dcb9a18f3e363f34cad",
                  "node_name": "朱剑冬的探测点"
                },
                {
                  "latest_data": {
                    "qsm.custom.http.response": {
                      "timestamp": 1487304600000,
                      "metric": "qsm.custom.http.response",
                      "value": "24.67099952697754"
                    },
                    "qsm.custom.http.totaltime": {
                      "timestamp": 1487304600000,
                      "metric": "qsm.custom.http.totaltime",
                      "value": "70.40799713134766"
                    }
                  },
                  "node_private_ip": "10.77.34.132",
                  "node_id": "4f03eb1f4ccc480f9542a123b83bd5cc",
                  "node_name": "朱剑冬的探测点2"
                }
              ]
            }
          });
        }, 500);
  },




   '/qsm/api/v1/tasks/:task_id/events':function(req,res){
      setTimeout(function(){
          res.json({
            code:"0",
            msg:'',
           "data": [
                      {
                        "update_time": 1488267963,
                        "event_type": "Action",
                        "event_summary": "邮件发送成功;邮件接收人:[u'zhujiandong@qiyi.com', u'zhujiandong@qiyi.com', u'zhujiandong@qiyi.com']",
                        "alarm_strategy_id": "9bb34251daca4072a0252e404d6babc0",
                        "alarm_strategy_name": "qim",
                        "event_status": "alarm",
                        "event_data": ""
                      },
                      {
                        "update_time": 1488273289,
                        "event_type": "StatusUpdate",
                        "event_summary": "告警策略qim 异常：QSM站点监控 HTTP监控-qim 的响应时间 平均值值为 1000(报警条件为 > 999 ), 探测目标为：http://qim.qiyi.domain",
                        "alarm_strategy_id": "9bb34251daca4072a0252e404d6babc0",
                        "alarm_strategy_name": "qim",
                        "event_status": "alarm",
                        "event_data": ""
                      },
                      {
                        "update_time": 1488267963,
                        "event_type": "Action",
                        "event_summary": "邮件发送成功;邮件接收人:zhujiandong@qiyi.com,zhujiandong@qiyi.com,zhujiandong@qiyi.com",
                        "alarm_strategy_id": "9bb34251daca4072a0252e404d6babc0",
                        "alarm_strategy_name": "qim",
                        "event_status": "alarm",
                        "event_data": ""
                      },
                      {
                        "update_time": 1488274202,
                        "event_type": "Action",
                        "event_summary": "邮件发送成功;邮件接收人:zhujiandong@qiyi.com",
                        "alarm_strategy_id": "b51a293911de48adae4f45f7cc55f1b6",
                        "alarm_strategy_name": "qim-2",
                        "event_status": "ok",
                        "event_data": ""
                      }
                  ]
          });
      },500);
  },


  '/qsm/api/v1/dashboard/alarm_strategies':function(req,res){
      setTimeout(function(){
          res.json({
            code:"0",
            msg:'',
            "data":[
                      {
                        "status": 1,
                        "update_time": 1490620963,
                        "target": "www.baidu.com",
                        "task_id": "d0cbeb5551af4671b35bc0ab312f43f8",
                        "alarm_level": 1,
                        "alarm_name": "pingmethod",
                        "alarm_strategy_id": "41584369a40a4ae4bbf890fb7631d7d6",
                        "strategy_description": "response(avg) > 0",
                        "task_name": "ping"
                      }

                  ]
          });
      },500);
  },

  '/qsm/api/v1/dashboard/events':function(req,res){
      setTimeout(function(){
        res.json({
          code:'0',
          msg:'',
          "data": [
            {
              "update_time": 1488279129,
              "event_summary": "告警策略ping的策略异常：QSM站点监控 PING监控 ping1 的响应时间平均值为 1.1675 (报警条件为 != 999 ), 探测目标为：10.77.33.1",
              "event_type": "StatusUpdate",
              "alarm_name": "ping的策略"
            },
            {
              "update_time": 1488273901,
              "event_summary": "邮件发送成功;邮件接收人:zhujiandong@qiyi.com",
              "event_type": "Action",
              "alarm_name": "ping的策略"
            }
          ]
        })

      },500)
},

 '/qsm/api/v1/dashboard/tasks':function(req,res){
      setTimeout(function(){
        res.json({
          "msg": "ok",
          "code": 0,
          "data": [
            {
              "count": 1,
              "type": "HTTP"
            },
            {
              "count": 2,
              "type": "PING"
            },
            {
              "count": 1,
              "type": "TCP"
            }
          ]
        })
      },500)
 }




};