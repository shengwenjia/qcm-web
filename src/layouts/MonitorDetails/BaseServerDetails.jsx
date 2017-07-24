import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Radio, Table, Icon, Select, Input, Button, Modal, DatePicker } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './MonitorDetails.less';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import PerSentEchartsLine from '../../components/EchartsPie/PerSentEchartsLine';
import NumEchartsLine from '../../components/EchartsPie/NumEchartsLine';
import NotFound from '../../components/NotFound/NotFound';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class BaseServerDetails extends Component {
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

    /******** 如果无 task_id 返回 404 页面 ********/
    const serverId = todos.dispatchReducer.baseServerId.task_id;
    if(typeof(serverId) == 'undefined'){
      return (<NotFound />)
    }

    /*********** 数据等待 ***********/
    const showLoading = todos.getQdmDetailsData.loading; 

    /********** 配置可视化数据 *********/
    const private_ip = todos.dispatchReducer.baseServerId.server_ip;
    
    const data = todos.getQdmDetailsData.serverdetailsdata;
    const cpu_load_time = [];
    const cpu_load_val = [];
    const memory_size_time = [];
    const memory_size_val = [];
    const connect_num_time = [];
    const connect_num_val = [];
    if(data.length > 0){
      const cpu_load = data[0].dps; // cpu负载数据
      const memory_size = data[1].dps; // 内存使用率数据
      const connect_num = data[2].dps; // 连接数数据

      for(var key in cpu_load){
        const deal_time = new Date(key * 1000).toLocaleString();
        const deal_val = cpu_load[key].toFixed(2);

        cpu_load_time.push(deal_time);
        cpu_load_val.push(deal_val);
      }

      for(var key in memory_size){
        const deal_time = new Date(key * 1000).toLocaleString();
        const deal_val = memory_size[key].toFixed();

        memory_size_time.push(deal_time);
        memory_size_val.push(deal_val);
      }

      for(var key in connect_num){
        const deal_time = new Date(key * 1000).toLocaleString();
        const deal_val = connect_num[key].toFixed();

        connect_num_time.push(deal_time);
        connect_num_val.push(deal_val);
      }
    }

    const data_cpu = {
      time_quantum: cpu_load_time,
      time_quantum_value: cpu_load_val,
    };
    const data_dic = {
      time_quantum: memory_size_time,
      time_quantum_value: memory_size_val,
    };
    const data_connectnum = {
      time_quantum: connect_num_time,
      time_quantum_value: connect_num_val,
    };
    const echarts_style = {
      minWidth: '960px',
      height: '350px',
      margin: '0 auto',     
    };

    const custom_date = this.state.dateString;
    const date_items = [];
    if(typeof(custom_date) != 'undefined'){
      for(var i = 0; i < custom_date.length; i++){
        date_items.push(<span key={i} style={{paddingLeft: '10px'}}>{custom_date[i]}</span>);
      }
    }

    return (
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
              <Breadcrumb.Item>监控详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
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
                <PerSentEchartsLine dataSource={data_cpu} style={echarts_style} private_ip={private_ip} title='CPU负载' showLoading={showLoading} />
              </div>
              <div className={styles.monitor_data}>
                <PerSentEchartsLine dataSource={data_dic} style={echarts_style} private_ip={private_ip} title='内存空闲率' showLoading={showLoading} />
              </div>
              <div className={styles.monitor_data}>
                <NumEchartsLine dataSource={data_connectnum} style={echarts_style} private_ip={private_ip} title='连接数' showLoading={showLoading} />
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
    const { todos, dispatch } = this.props;
    const serverId = todos.dispatchReducer.baseServerId.task_id; // 对应 ID 的链路详细信息
    const now = new Date();
    const endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
    const startTime = Math.round(now.setHours(now.getHours() - 3) / 1000); // 日志开始请求时间

    dispatch({
      type: 'todos/getQdmServerTaskStatistics',
      task_id: serverId,
      start: startTime,
      end: endTime,
    });
  }

  onChange(e){
    const { todos, dispatch } = this.props;
    const now = new Date();
    var endTime = '';
    var startTime = '';
    const time = e.target.value;
    const task_id = todos.dispatchReducer.baseServerId.task_id;

    switch(time){
      case '3h-ago':        
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setHours(now.getHours() - 3) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
      case '6h-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setHours(now.getHours() - 6) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
      case '1d-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setDate(now.getDate() - 1) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
      case '3d-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setDate(now.getDate() - 3) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmServerTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
    }

    this.setState({ // 切换时间范围时隐藏自定义时间范围
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
    console.log('Clicked OK');
    const { todos, dispatch } = this.props;
    const task_id = todos.dispatchReducer.baseServerId.task_id;

    if(typeof(this.state.dateString) != 'undefined'){ // 如果自定义时间范围存在，显示自定义时间
      const time_arr = []; // 时间数组
      for(var value of this.state.date){
        const deal_time = Math.round(Date.parse(value) / 1000);
        time_arr.push(deal_time);
      }

      dispatch({
        type: 'todos/getQdmServerTaskStatistics',
        task_id: task_id,
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

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return { todos: filter(todos) };
}

export default connect(mapStateToProps)(BaseServerDetails);