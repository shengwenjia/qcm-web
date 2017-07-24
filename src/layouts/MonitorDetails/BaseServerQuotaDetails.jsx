import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Breadcrumb, Radio, Select, Button, Modal, DatePicker } from 'antd';

import styles from './MonitorDetails.less';

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import NumEchartsLine from '../../components/EchartsPie/NumEchartsLine.jsx';
import NotFound from '../../components/NotFound/NotFound';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class BaseServerQuotaDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      costum_style: {
        display: 'none',
      }
    }
  }

  render(){
    const { todos, dispatch } = this.props;    

    /************ 如果 server_ip 不存在，返回 404 ************/
    const metrics_name = todos.dispatchReducer.baseServerQuota.target_name;
    const server_ip = todos.dispatchReducer.baseServerId + ' 指标：' + metrics_name;
    if(typeof(metrics_name) == 'undefined'){
      return (<NotFound />);
    }

    /*************** 配置可视化数据 *****************/
    const data = todos.getQdmDetailsData.serverquerymetricshistory; 
    const metrics_time = [];
    const metrics_val = [];
    const private_ip = server_ip;
    const showLoading = todos.getQdmDetailsData.loading;

    if(data.length > 0){
      const metrics_history = data[0].dps; // metrics 历史数据

      for(var key in metrics_history){
        const deal_time = new Date(key * 1000).toLocaleString();
        const deal_val = metrics_history[key];

        metrics_time.push(deal_time);
        metrics_val.push(deal_val);
      }
    }    

    const data_echarts = {
      time_quantum: metrics_time,
      time_quantum_value: metrics_val,
    };
    const echarts_style = {
      minWidth: '960px',
      height: '350px',
      margin: '0 auto',     
    };

    /************* 显示自定义时间 ****************/
    const custom_date = this.state.dateString;
    const date_items = [];
    if(typeof(custom_date) != 'undefined'){
      for(var i = 0; i < custom_date.length; i++){
        date_items.push(<span key={i} style={{paddingLeft: '10px'}}>{custom_date[i]}</span>);
      }
    }

    return(
      <div>
        <div className={styles.subheader}>
          <div className={styles.wrapper}>
            <TwoLevelNav />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.breadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>
                {/*<Link to='/'>首页</Link>*/}
                <Link to='/dashboard'>首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to='/qam'>应用拓扑监控</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to='/qam/qdm'>直播链路监控</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to='/qam/qdm/monitor-details/baseserver'>基础服务器监控</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                指标详情
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content_details}>
              <div className={styles.monitor_type}>
                <div className={styles.search_input}>
                  <RadioGroup defaultValue="3h-ago" onChange={this.onChange.bind(this)}>
                    <RadioButton value="3h-ago">最近三小时</RadioButton>
                    <RadioButton value="6h-ago">最近六小时</RadioButton>
                    <RadioButton value="1d-ago">最近一天</RadioButton>
                    <RadioButton value="3d-ago">最近三天</RadioButton>
                    <RadioButton value="custom" onClick={this.showModal.bind(this)}>自定义范围</RadioButton>                    
                  </RadioGroup>
                  <span style={this.state.costum_style}>自定义时间范围：{date_items}</span>
                </div>                
              </div>
              <div className={styles.monitor_data}>
                <NumEchartsLine dataSource={data_echarts} style={echarts_style} private_ip={private_ip} title='Graph' showLoading={showLoading} />
              </div>
            </div>
          </div>
        </div>
        <Modal title="自定义范围" 
        visible={this.state.visible} 
        onOk={this.handleOk.bind(this)} 
        onCancel={this.handleCancel.bind(this)} 
        >
          <p>
            <label htmlFor='时间范围'>请选择时间范围：</label>
            <RangePicker 
            format="YYYY/MM/DD-HH:mm:ss" 
            disabledDate={this.disabledDate} 
            placeholder={['开始时间', '结束时间']} 
            showTime 
            onChange={this.timerChange.bind(this)} />
          </p>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    const { dispatch, todos } = this.props;
    const itemid = todos.dispatchReducer.baseServerQuota.itemId;
    const server = todos.dispatchReducer.baseServerQuota.server;
    const value_type = todos.dispatchReducer.baseServerQuota.value_type;

    const now = new Date();
    const endTime = Math.round(now.getTime() / 1000);
    const startTime = Math.round(now.setHours(now.getHours() - 3) / 1000);

    dispatch({
      type: 'todos/getQdmServerQueryMetricsHistory',
      itemid: itemid,
      server: server,
      value_type: value_type,
      start: startTime,
      end: endTime
    });
  }

  onChange(e){
    const { todos, dispatch } = this.props;
    const now = new Date();
    var endTime = '';
    var startTime = '';
    const time = e.target.value;
    const itemid = todos.dispatchReducer.baseServerQuota.itemId;
    const server = todos.dispatchReducer.baseServerQuota.server;
    const value_type = todos.dispatchReducer.baseServerQuota.value_type;
    
    switch(time){
      case '3h-ago':
        endTime = Math.round(now.getTime()/1000);
        startTime = Math.round(now.setHours(now.getHours() - 3) / 1000);

        dispatch({
          type: 'todos/getQdmServerQueryMetricsHistory',
          itemid: itemid,
          server: server,
          value_type: value_type,
          start: startTime,
          end: endTime
        });
        break;
      case '6h-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setHours(now.getHours() - 6) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerQueryMetricsHistory',
          itemid: itemid,
          server: server,
          value_type: value_type,
          start: startTime,
          end: endTime
        });
        break;
      case '1d-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setDate(now.getDate() - 1) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerQueryMetricsHistory',
          itemid: itemid,
          server: server,
          value_type: value_type,
          start: startTime,
          end: endTime
        });
        break;
      case '3d-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setDate(now.getDate() - 3) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerQueryMetricsHistory',
          itemid: itemid,
          server: server,
          value_type: value_type,
          start: startTime,
          end: endTime
        });
        break;
    }

    this.setState({
      costum_style: {
        display: 'none',        
      }
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    console.log("ok");
    const { todos, dispatch } = this.props;
    const itemid = todos.dispatchReducer.baseServerQuota.itemId;
    const server = todos.dispatchReducer.baseServerQuota.server;
    const value_type = todos.dispatchReducer.baseServerQuota.value_type;

    if(typeof(this.state.dateString) != 'undefined'){
      const time_arr = []; // 时间数组
      for(var value of this.state.date){
        const deal_time = Math.round(Date.parse(value) / 1000);
        time_arr.push(deal_time);
      }

      dispatch({
        type: 'todos/getQdmServerQueryMetricsHistory',
        itemid: itemid,
        server: server,
        value_type: value_type,
        start: time_arr[0],
        end: time_arr[1],
      });

      this.setState({
        costum_style: {
          display: 'inline-block',
          marginLeft: '20px',
        }
      });
    }
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  disabledDate(current) {
    // 今日之后的日期禁止选择
    return current && current.valueOf() > Date.now();
  }

  timerChange(date, dateString){
    // console.log('date', date);
    // console.log('dateString', dateString);
    this.setState({
      dateString: dateString,
      date: date,
    });
  }
}

BaseServerQuotaDetails.propTypes = {};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return { todos: filter(todos) };
}

export default connect(mapStateToProps)(BaseServerQuotaDetails);