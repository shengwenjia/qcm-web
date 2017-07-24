import React, { Component, PropTypes } from 'react';
import { Checkbox,Select, Spin } from 'antd';
import { connect } from 'react-redux';
import styles from './detailControlCenter.less';
import EchartsPie from '../../components/EchartsPie/EchartsPie';
import EchartsLine from '../../components/EchartsPie/EchartsLine';

const CheckboxGroup = Checkbox.Group;

const Option = Select.Option;

var plainOptions = [{
  label: '全网均值',
  value: 'average'
}];
var summarygroup = [];
var summarytitle = [];
var legends = [];
var xaxisdata1 = [];
var xaxisdata2 = [];
var seriesdata1 = [];
var seriesdata2 = [];
var _param = [];
var needavg = false;

var url_task_id = '';
var url_monitor_type = '';
var url_start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600));
var url_end_time = Math.round(new Date().getTime()/1000);
var end_time = Math.round(new Date().getTime()/1000);

var url_name = '';
var url_monitor_obj = '';
var url_monitor_rate = '';
var start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600));
var end_time = Math.round(new Date().getTime()/1000);

class DetailInfomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      url_name: '',
      url_monitor_obj: '',
      url_monitor_rate: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    url_name = nextProps.todos.getTask.taskdata.task_name;
    url_monitor_obj = nextProps.todos.getTask.taskdata.target;
    url_monitor_rate = nextProps.todos.getTask.taskdata.period;

    if(typeof(url_monitor_rate) != 'undefined'){ // 获得值之后进行状态赋值
      this.setState({
        url_name: url_name,
        url_monitor_obj: url_monitor_obj,
        url_monitor_rate: url_monitor_rate + 's'
      });      
    }

    // this.setState({
    //   url_name: url_name,
    //   url_monitor_obj: url_monitor_obj,
    //   url_monitor_rate: url_monitor_rate
    // });

    var url_record = {
        name: url_name,
        monitor_obj: url_monitor_obj,
        monitor_rate: url_monitor_rate
    };
  }

  componentDidMount() {
    const { todos, dispatch } = this.props;
    const { data } = todos.detailInfo;

    url_task_id = window.location.href.split("#")[1];
    url_monitor_type = window.location.href.split("#")[2];
    url_start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600));
    url_end_time = Math.round(new Date().getTime()/1000);
    end_time = Math.round(new Date().getTime()/1000);

    var payLoad = {
      id: url_task_id,
      start: url_start_time,
      end: url_end_time,
      need_avg: needavg
    };
    dispatch({
      type: 'todos/getTaskCharts',
      payload: payLoad
    });

    dispatch({
      type: 'todos/getTask',  
      id: url_task_id,
    });
    dispatch({
      type: 'todos/getMetricCharts',
      payload: { monitor_type: url_monitor_type }
    });

    var url_record = {
        id: url_task_id,
        monitor_type: url_monitor_type,
        name: url_name,
        monitor_obj: url_monitor_obj,
        monitor_rate: url_monitor_rate
    };
    dispatch({
      type: 'put/detailInfo',
      payload: url_record,
    });

    setTimeout(function() {
      $(".ant-checkbox-group-item").eq(0).trigger("click");
    }, 1000);
  }

  render(){
    const { todos, dispatch } = this.props;
    const { data, chartData, MetricsChartData, latestdata } = todos.detailInfo;
    const { taskdata } = todos.getTask;

    var start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600));
    end_time = Math.round(new Date().getTime()/1000);
    url_end_time = Math.round(new Date().getTime()/1000);

    // console.log("chartData: " + JSON.stringify(chartData));
    // console.log("MetricsChartData: " + JSON.stringify(MetricsChartData));
    // console.log("data: " + JSON.stringify(data));
    // console.log("taskdata: " + JSON.stringify(taskdata));
    // console.log("latestdata: " + JSON.stringify(latestdata));

    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,
            // month
            "d+": this.getDate(),
            // day
            "h+": this.getHours(),
            // hour
            "m+": this.getMinutes(),
            // minute
            "s+": this.getSeconds(),
            // second
            "q+": Math.floor((this.getMonth() + 3) / 3),
            // quarter
            "S": this.getMilliseconds()
            // millisecond
        };
        if (/(y+)/.test(format) || /(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    const dateformat = (timestamp) => {
      return (new Date(timestamp.text * 1000)).format("yyyy-MM-dd hh:mm:ss");
    }

    const logdateformat = (timestamp) => {
      return (new Date(timestamp * 1000)).format("yyyy-MM-dd hh:mm:ss");
    }

    if(taskdata.nodes) {      
      plainOptions = [{
        label: '全网均值',
        value: 'average'
      }];
      taskdata.nodes.map(function(data, index) {        
        // console.log(data);
          var obj = {
            label: '',
            value: '',
            // node_id: '',
            // node_name: '',
            // key: '',
            // node_ip: ''
          };
          obj.label = data.name;
          obj.value = data.node_ip;
          // obj.node_id = data.node_id;
          // obj.key = data.node_id;
          // obj.node_name = data.name;
          // obj.node_ip = data.node_ip;
          plainOptions.push(obj);
      });
    }

    summarytitle = [];
    MetricsChartData.map(function(data, index) {
      summarytitle.push(data.name); 
    });

    if(chartData.statistics) {

      xaxisdata1 = [];
      xaxisdata2 = [];
      seriesdata1 = [];
      seriesdata2 = [];

        legends.map(function(legend_data, legend_index) {
            for(var key in chartData.statistics) {
              var temp_key = [];
              var temp_val = [];

              if(!chartData.statistics[legend_data]) {
                return;
              }

              /**begin*/
              for(var i = 0; i < chartData.statistics[legend_data].length; i++) {

                if(data.monitor_type && data.monitor_type.toLowerCase() == 'http') {

                  if(chartData.statistics[legend_data][i].metric.indexOf('qsm.custom.http.response') == 0) {
                    var temp_series = {
                        name:'',
                        type:'line',
                        data:[]
                      };
                    temp_series.name = legend_data;
                    for(var key in chartData.statistics[legend_data][i].dps) {
                      temp_key.push(logdateformat(key));
                      temp_val.push(chartData.statistics[legend_data][i].dps[key].toFixed(2));
                    }

                    xaxisdata1 = temp_key;
                    temp_series.data = temp_val;
                    seriesdata1.push(temp_series);
                  }

                  if(chartData.statistics[legend_data][i].metric.indexOf('qsm.custom.http.totaltime') == 0) {
                    var temp_series = {
                        name:'',
                        type:'line',
                        data:[]
                      };
                    temp_series.name = legend_data;
                    var temp_key = [];
                    var temp_val = [];
                    for(var key in chartData.statistics[legend_data][i].dps) {
                      temp_key.push(logdateformat(key));
                      temp_val.push(chartData.statistics[legend_data][i].dps[key].toFixed(2));
                    }

                    xaxisdata2 = temp_key;
                    temp_series.data = temp_val;
                    seriesdata2.push(temp_series);
                    return;
                  }

                } else if(data.monitor_type && data.monitor_type.toLowerCase() == 'ping') {

                  if(chartData.statistics[legend_data][i].metric.indexOf('qsm.custom.ping.response') == 0) {
                    var temp_series = {
                        name:'',
                        type:'line',
                        data:[]
                      };
                    temp_series.name = legend_data;
                    for(var key in chartData.statistics[legend_data][i].dps) {
                      temp_key.push(logdateformat(key));
                      temp_val.push(chartData.statistics[legend_data][i].dps[key].toFixed(2));
                    }

                    xaxisdata1 = temp_key;
                    temp_series.data = temp_val;
                    seriesdata1.push(temp_series);
                  }

                  if(chartData.statistics[legend_data][i].metric.indexOf('qsm.custom.ping.loss') == 0) {
                    var temp_series = {
                        name:'',
                        type:'line',
                        data:[]
                      };
                    temp_series.name = legend_data;
                    var temp_key = [];
                    var temp_val = [];
                    for(var key in chartData.statistics[legend_data][i].dps) {
                      temp_key.push(logdateformat(key));
                      temp_val.push(chartData.statistics[legend_data][i].dps[key].toFixed(2));
                    }

                    xaxisdata2 = temp_key;
                    temp_series.data = temp_val;
                    seriesdata2.push(temp_series);
                    return;
                  }

                } else if(data.monitor_type && data.monitor_type.toLowerCase() == 'tcp') {

                  if(chartData.statistics[legend_data][i].metric.indexOf('qsm.custom.tcp.availability') == 0) {
                    var temp_series = {
                        name:'',
                        type:'line',
                        data:[]
                      };
                    temp_series.name = legend_data;
                    for(var key in chartData.statistics[legend_data][i].dps) {
                      temp_key.push(logdateformat(key));
                      temp_val.push(chartData.statistics[legend_data][i].dps[key].toFixed(2));
                    }

                    xaxisdata1 = temp_key;
                    temp_series.data = temp_val;
                    seriesdata1.push(temp_series);
                  }

                  if(chartData.statistics[legend_data][i].metric.indexOf('qsm.custom.tcp.response') == 0) {
                    var temp_series = {
                        name:'',
                        type:'line',
                        data:[]
                      };
                    temp_series.name = legend_data;
                    var temp_key = [];
                    var temp_val = [];
                    for(var key in chartData.statistics[legend_data][i].dps) {
                      temp_key.push(logdateformat(key));
                      temp_val.push(chartData.statistics[legend_data][i].dps[key].toFixed(2));
                    }

                    xaxisdata2 = temp_key;
                    temp_series.data = temp_val;
                    seriesdata2.push(temp_series);
                    return;
                  }

                }

              }
              /**end*/



            }
        });

    }

    const selectPeriod = (date) => {
      if(date == '1h') {
        start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600));
      } else if(date == '6h') {
        start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600*6));
      } else if(date == '1d') {
        start_time = Date.parse(new Date(new Date().getTime()/1000 - 3600*24));
      } else if(date == '7d') {
        start_time = Date.parse(new Date(new Date().getTime()/1000 - 86400*7));
      } else if(date == '14d') {
        start_time = Date.parse(new Date(new Date().getTime()/1000 - 86400*14));
      }

      var payLoad = {
        id: data.id,
        start: start_time,
        end: end_time,
        node_ip: _param.length > 0 ? _param : null,
        need_avg: needavg
      };
      dispatch({
        type: 'todos/getTaskCharts',
        payload: payLoad
      });
    }

    const selectMonitor = (param) => {
        legends = param;
        _param = param.slice(0);
        needavg = false;
        for(var i = 0; i < param.length; i++) {
          if(param[i] == 'average') {
            needavg = true;
            _param.splice(i, 1);
          }
        }
        if(param.length > 0) {
            var payLoad = {
              id: data.id,
              start: start_time,
              end: end_time,
              node_ip: _param.length > 0 ? _param : null,
              need_avg: needavg
            };
            dispatch({
              type: 'todos/getTaskCharts',
              payload: payLoad
            });
        } else {
          legends = [];
          xaxisdata1 = [];
          seriesdata1 = [];
          xaxisdata2 = [];
          seriesdata2 = [];
        }
        this.setState({
          refresh: true
        });
    }

    // console.log("legends: " + legends);
    // console.log("xaxisdata1: " + xaxisdata1);
    // console.log("seriesdata1: " + JSON.stringify(seriesdata1));

    // console.log("xaxisdata2: " + xaxisdata2);
    // console.log("seriesdata2: " + JSON.stringify(seriesdata2));
    // console.log("plainOptions: " + JSON.stringify(plainOptions));

    // console.log("summarytitle: " + JSON.stringify(summarytitle));

    return (
      <div className={styles.main_content}>
        <div className={styles.label_title}>
          <label style={{ fontSize: "12px" }}>基本信息</label>
        </div>
        <div className={styles.basic_info}>
          <div className={styles.basic_info_part}>
            <p>
              <label style={{ fontSize: "12px" }}>任务名称：</label>
              <label style={{ fontSize: "12px" }}>{ this.state.url_name}</label>
            </p>
            <p>
              <label style={{ fontSize: "12px" }}>监控频率：</label>
              <label style={{ fontSize: "12px" }}>{ this.state.url_monitor_rate}</label>
            </p>
          </div>
          <div className={styles.basic_info_part}>
            <p>
              <label style={{ fontSize: "12px" }}>监控对象：</label>
              <label style={{ fontSize: "12px" }}>{ this.state.url_monitor_obj}</label>
            </p>
            <p>
              <label style={{ fontSize: "12px" }}>监控类型：</label>
              <label style={{ fontSize: "12px" }}>{data.monitor_type}</label>
            </p>
          </div>
        </div>
        <div className={styles.label_title}>
          <label style={{ fontSize: "12px" }}>监控数据</label>
        </div>
        <div className={styles.check}>

          <CheckboxGroup options={plainOptions} onChange={selectMonitor} />

          <div className={styles.div_time}>
            <label htmlFor='title' style={{paddingRight: '10px'}}>最近：</label>                  
              <Select style={{ width: 120 }} defaultValue={'1h'} onChange={selectPeriod}>
                <Option value="1h">1小时</Option>
                <Option value="6h">6小时</Option>
                <Option value="1d">1天</Option>
                <Option value="7d">7天</Option>
                <Option value="14d">14天</Option>
              </Select>
          </div>

        <div className={styles.response_time}>
          <div className={styles.res_chart}>
            <EchartsLine legends={legends} xaxis_data={xaxisdata1} series_data={seriesdata1} title={summarytitle[0]} />
          </div>
          <div className={styles.res_chart}>
            <EchartsLine legends={legends} xaxis_data={xaxisdata2} series_data={seriesdata2} title={summarytitle[1]} />
          </div>
        </div>

        </div>
      </div>
    );
  }

}

DetailInfomation.propTypes = {
  data: PropTypes.any,
};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(DetailInfomation);