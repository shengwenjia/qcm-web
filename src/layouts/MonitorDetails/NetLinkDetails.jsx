import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Radio, Select, Button, Modal, DatePicker } from 'antd';
import { Link } from 'react-router';

import NotFound from '../../components/NotFound/NotFound';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import ResEchartsLine from '../../components/EchartsPie/ResEchartsLine';
import LossEchartsLine from '../../components/EchartsPie/LossEchartsLine';

import styles from './MonitorDetails.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class NetLinkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      costum_style: {
        display: 'none',
      }
    }
  }

  render() {
    const { dispatch, todos } = this.props;

    /******** 如果无 task_id 返回 404 页面 ********/
    const netId = todos.dispatchReducer.netLinkId.task_id;
    if(typeof(netId) == 'undefined'){
      return (<NotFound />)
    }

    /*********** 数据等待 ***********/
    const showLoading = todos.getQdmDetailsData.loading;    

    /********** 配置可视化数据 *********/
    const src_ip = todos.dispatchReducer.netLinkId.source_ip;
    const dst_ip = todos.dispatchReducer.netLinkId.target_ip;

    const data = todos.getQdmDetailsData.netdetailsdata;
    const res_time_arr = [];
    const res_time_val = [];
    const los_time_arr = [];
    const los_time_val = [];
    if(data.length > 0){
      const res_arr = data[0].dps; // 响应时间数据
      const los_arr = data[1].dps; // 丢包率数据

      for(var key in res_arr){
        const deal_time = new Date(key * 1000).toLocaleString();
        const deal_val = res_arr[key].toFixed(2);

        res_time_arr.push(deal_time);
        res_time_val.push(deal_val);
      }

      for(var key in los_arr){
        const deal_time = new Date(key * 1000).toLocaleString();
        const deal_val = los_arr[key].toFixed();

        los_time_arr.push(deal_time);
        los_time_val.push(deal_val);
      }
    }

    const dataSource_restime = {
      time_quantum: res_time_arr,
      time_quantum_value: res_time_val,
    };
    const dataSource_lostage = {
      time_quantum: los_time_arr,
      time_quantum_value: los_time_val
    }
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
                <Link to='/qam/qdm/monitor-details/netlink'>网络链路监控</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>监控详情</Breadcrumb.Item>
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
                <ResEchartsLine dataSource={dataSource_restime} style={echarts_style} loading={showLoading} src_ip={src_ip} dst_ip={dst_ip} />
              </div>
              <div className={styles.monitor_data}>
                <LossEchartsLine dataSource={dataSource_lostage} style={echarts_style} loading={showLoading} src_ip={src_ip} dst_ip={dst_ip} />
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
    const netId = todos.dispatchReducer.netLinkId.task_id; // 对应 ID 的链路详细信息
    const now = new Date();
    const endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
    const startTime = Math.round(now.setHours(now.getHours() - 3) / 1000); // 日志开始请求时间

    dispatch({
      type: 'todos/getQdmLinkTaskStatistics',
      task_id: netId,
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
    const task_id = todos.dispatchReducer.netLinkId.task_id;

    switch(time){
      case '3h-ago':        
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setHours(now.getHours() - 3) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmLinkTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
      case '6h-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setHours(now.getHours() - 6) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmLinkTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
      case '1d-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setDate(now.getDate() - 1) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmLinkTaskStatistics',
          task_id: task_id,
          start: startTime,
          end: endTime,
        });
        break;
      case '3d-ago':
        endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
        startTime = Math.round(now.setDate(now.getDate() - 3) / 1000); // 日志开始请求时间

        dispatch({
          type: 'todos/getQdmLinkTaskStatistics',
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
    const task_id = todos.dispatchReducer.netLinkId.task_id;    

    if(typeof(this.state.dateString) != 'undefined'){ // 如果自定义时间范围存在，显示自定义时间
      const time_arr = []; // 时间数组
      for(var value of this.state.date){
        const deal_time = Math.round(Date.parse(value) / 1000);
        time_arr.push(deal_time);
      }

      dispatch({
        type: 'todos/getQdmLinkTaskStatistics',
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

NetLinkDetails.propTypes = {};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return { todos: filter(todos) };
}

export default connect(mapStateToProps)(NetLinkDetails);