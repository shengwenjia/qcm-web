import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button, message, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import styles from './detailControlCenter.less';

const Option = Select.Option;
const allAlarm = []; // 用于筛选的全部数据

class DetailAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_id: props.data.id,
      delete_id: '',
      dataSource: [],
      alarm_status: '0',
      shield: '0',
    };
  }

  componentWillReceiveProps(nextProps) {
    const alarm_strategies = nextProps.todos.getAlarmStrategies.data.alarm_strategies;
    const { dataSource } = this.state;
    // 每次接口请求数据之后，清空原有的状态和全局变量
    dataSource.splice(0, dataSource.length);
    allAlarm.splice(0, allAlarm.length);

    if(typeof(alarm_strategies) != 'undefined'){
      for(let value of alarm_strategies){
        const deal_data = {
          id: value.alarm_strategy_id,
          strategy_name: value.alarm_name,
          strategy_status: value.alarm_status,
          shield_alarm: value.alarm_pause,
          action: value.alarm_enable,
          monitor_rule: value.strategy_description,
          error_notice: value.alarm_actions,
          action: value.alarm_pause
        };
        dataSource.push(deal_data);
        allAlarm.push(deal_data);
      }

      this.setState({
        dataSource
      });
    }    
  }

  render(){
    const { dispatch } = this.props;
    const dataSource = [];
    const { data, loading } = this.props.todos.getAlarmStrategies;
    // const alarm_strategies = data.alarm_strategies;
    const detailData = this.props.todos.detailInfo.data;
    // /*
    //  * 整理接口数据
    //  */
    // if(typeof(alarm_strategies) != 'undefined'){
    //   for(let value of alarm_strategies){
    //     const deal_data = {
    //       id: value.alarm_strategy_id,
    //       strategy_name: value.alarm_name,
    //       strategy_status: value.alarm_status,
    //       shield_alarm: value.alarm_pause,
    //       action: value.alarm_enable,
    //       monitor_rule: value.strategy_description,
    //       error_notice: value.alarm_actions,
    //       action: value.alarm_pause
    //     };
    //     dataSource.push(deal_data);
    //   }
    // }    
    /*
     * 屏蔽报警策略
     */
    const shield_alarm = (record) => {
      // console.log(record);
      const values = {
        task_id: this.state.task_id,
        alarm_strategy_id: record.id,
        pause: 1
      };
      dispatch({
        type: 'todos/toggleAlarmStrategy',
        payload: values,
      });
    };
    /*
     * 打开报警策略
     */
    const open_alarm = (record) => {
      const values = {
        task_id: this.state.task_id,
        alarm_strategy_id: record.id,
        pause: 0
      };
      dispatch({
        type: 'todos/toggleAlarmStrategy',
        payload: values,
      });
    };
    /*
     * 修改报警策略
     */
    const update_data = (record) => {
      dispatch({
        type: 'todos/getAlarmUser'
      });
      
      dispatch({
        type: 'todos/getAlarmStrategy',
        payload: record.id
      });

      dispatch({
        type: 'todos/getMetricCharts',
        payload: detailData,
      });

      dispatch({
        type: 'transmitId',
        payload: this.state.task_id,
      });
      browserHistory.push('/qsm/alarm/update');
    };
    /*
     * 删除报警策略
     */
    const delete_data = (id) => {
      this.setState({
        delete_id: id,
      });
    };
    /*
     * 确认删除
     */
    const confirm = () => {
      const delete_data = {
        task_id: this.state.task_id,
        alarm_strategy_id: this.state.delete_id,
      };
      dispatch({
        type: 'todos/deleteAlarmStrategy',
        payload: delete_data,
      });
    };
    /*
     * 取消删除
     */
    const cancel = () => {
      console.log("cancel");
    };
    const alarm_info = (record) => {
      dispatch({
        type: 'todos/getAlarmStrategy',
        payload: record.id,
      });
      dispatch({
        type:'put/getAlarmPause',
        payload:record,
      });
      browserHistory.push('/qsm/alarm/info');
    };
    const columns = [{
      title: '策略名称',
      dataIndex: 'strategy_name',
      key: 'strategy_name',
      //render: text => <a>{text}</a>     
      render: (text,record) => (
        <a onClick={() => alarm_info(record)}>{text}</a>
      )
    },{
      title: '策略状态',
      dataIndex: 'strategy_status',
      key: 'strategy_status',
      render: (text) => {
        if(text == 0){
          return (<span style={{color: '#339933',}}>正常</span>);
        }else{
          return (<span style={{color: '#CC3333',}}>异常</span>);
        }
      }
    },{
      title: '是否屏蔽报警',
      dataIndex: 'shield_alarm',
      key: 'shield_alarm',
      render: (text) => {
        if(text == 0){
          return (<span style={{color: '#339933',}}>未屏蔽</span>);
        }else{
          return (<span style={{color: '#CC3333',}}>已屏蔽</span>);
        }
      }
    },{
      title: '监控规则',
      dataIndex: 'monitor_rule',
      key: 'monitor_rule',
    },{
      title: '异常通知',
      dataIndex: 'error_notice',
      key: 'error_notice',
      render: (text) => {
        const items = [];
        for(var i = 0; i < text.length; i++){
          items.push(<label key={i} style={{marginLeft:'5px'}}>{text[i]}</label>);
        }
        return (items);
      }
    },{
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (text, record) => {
        if(text == 0){
          return(
            <span>
              <a onClick={() => shield_alarm(record)}>屏蔽报警</a>
              <span className="ant-divider" />
              <a onClick={() => update_data(record)}>修改</a>
              <span className="ant-divider" />
              <Popconfirm title="你确定删除么？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
                <a onClick={() => delete_data(record.id)}>删除</a>
              </Popconfirm>
            </span>
          );
        }else{
          return(
            <span>
              <a onClick={() => open_alarm(record)}>打开报警</a>
              <span className="ant-divider" />
              <a onClick={() => update_data(record)}>修改</a>
              <span className="ant-divider" />
              <Popconfirm title="你确定删除么？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
                <a onClick={() => delete_data(record.id)}>删除</a>
              </Popconfirm>
            </span>
          );
        }
      }
    }];

    return (
      <div className={styles.alarm_container}>
        <div style={{ padding: '5px 15px', overflow: 'hidden' }}>
          <Select style={{width: 150, padding: '0 5px'}} defaultValue='0' onChange={this.alarmChange.bind(this)}>
            <Option value='0'>告警状态</Option>
            <Option value='ok'>正常</Option>
            <Option value='error'>异常</Option>
          </Select>
          {/*<Select style={{width: 150, padding: '0 5px'}} defaultValue='0'>
            <Option value='0'>告警级别</Option>
            <Option value='1'>P1</Option>
            <Option value='2'>P2</Option>
            <Option value='3'>P3</Option>
            <Option value='4'>P4</Option>
          </Select>*/}
          <Select style={{width: 150, padding: '0 5px'}} defaultValue='0' onChange={this.shieldChange.bind(this)}>
            <Option value='0'>屏蔽状态</Option>
            <Option value='noshield'>未屏蔽</Option>
            <Option value='shield'>已屏蔽</Option>
          </Select>          
          {/*<Input placeholder='按策略名称搜索' style={{width: 200, margin: '0 5px'}} />*/}
          <Button style={{margin: '0 5px'}} onClick={this.handleSearch.bind(this)}>搜索</Button>
          <Link style={{ display: 'inline-block', float: 'right' }}>
            <Button type='primary' onClick={this.handleClick.bind(this)}>添加策略</Button>
          </Link>
        </div>
        <div style={{ clear: 'both' }}>
          <Table columns={columns} dataSource={this.state.dataSource} loading={loading} pagination={{pageSize: 5}} />
        </div>        
      </div>
    );
  }

  alarmChange(value){
    this.setState({
      alarm_status: value,
    });
  }
  shieldChange(value){
    this.setState({
      shield: value,
    });
  }
  handleSearch(){
    const filterData = [];
    const {alarm_status, shield} = this.state

    // 条件筛选
    if(alarm_status != '0' && shield == '0'){ // 告警状态不为 0, 屏蔽状态为 0

      if(alarm_status == 'ok'){ // 告警状态为正常
        for(let value of allAlarm){
          (value.strategy_status == 0) ? filterData.push(value) : console.log("err");          
        }
      }else{// 告警状态为异常
        for(let value of allAlarm){
          (value.strategy_status == 1) ? filterData.push(value) : console.log("ok");          
        }
      }
    }else if(alarm_status == '0' && shield != '0'){ // 告警状态为 0， 屏蔽状态不为 0

      if(shield == 'noshield'){ // 屏蔽状态 未屏蔽
        for(let value of allAlarm){
          (value.shield_alarm == 0) ? filterData.push(value) : console.log("shield");
        }
      }else{// 屏蔽状态 已屏蔽
        for(let value of allAlarm){
          (value.shield_alarm == 1) ? filterData.push(value) : console.log("noshield");
        }
      }
    }else if(alarm_status != '0' && shield != '0'){ // 告警状态不为 0, 屏蔽状态不为 0

      if(alarm_status == 'ok' && shield == 'noshield'){ // 告警状态为正常, 屏蔽状态 未屏蔽
        for(let value of allAlarm){
          (value.strategy_status == 0 && value.shield_alarm == 0) ? filterData.push(value) : console.log("err-shield");
        }
      }else if(alarm_status == 'error' && shield == 'noshield'){// 告警状态为异常, 屏蔽状态 未屏蔽
        for(let value of allAlarm){
          (value.strategy_status == 1 && value.shield_alarm == 0) ? filterData.push(value) : console.log("ok-shield");
        }
      }else if(alarm_status == 'ok' && shield == 'shield'){// 告警状态为正常, 屏蔽状态 已屏蔽
        for(let value of allAlarm){
          (value.strategy_status == 0 && value.shield_alarm == 1) ? filterData.push(value) : console.log("err-noshield");
        }
      }else{ // 告警状态为异常, 屏蔽状态 已屏蔽
        for(let value of allAlarm){
          (value.strategy_status == 1 && value.shield_alarm == 1) ? filterData.push(value) : console.log("ok-noshield");
        }
      }
    }else{// 告警状态为 0, 屏蔽状态为 0
      for(let value of allAlarm){filterData.push(value)}
    }

    this.setState({
      dataSource: filterData,
    });
  }

  handleClick(){
    const BelongData = this.props.data; // 父级监控项的详细信息

    if(typeof(this.state.task_id) != 'undefined'){
      this.props.dispatch({ // 跳转之前执行获得报警对象列表
        type: 'todos/getAlarmUser'
      });
      this.props.dispatch({
        type: 'todos/alarmCreate',
        payload: BelongData,
      });
      this.props.dispatch({
        type: 'todos/getMetricCharts',
        payload: BelongData,
      });
      this.props.dispatch({
        type: 'transmitId',
        payload: BelongData.id,
      });
      browserHistory.push('/qsm/alarm/create');
    }else{
      message.info("没有对应的项目ID，请返回性能监控页面重试。", 1.5);
    }    
  }

  componentDidMount() {
    if(typeof(this.state.task_id) != 'undefined'){
      this.props.dispatch({ // 获得具体监控项的所有报警策略
        type: 'todos/getAlarmStrategies',
        payload: this.state.task_id,
      });
    }else{
      console.warn("没有对应的项目ID");
    }
  }
}

DetailAlarm.propTypes = {
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

export default  connect(mapStateToProps)(DetailAlarm);