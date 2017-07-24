import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Table, Icon, Popconfirm, message, notification } from 'antd';

class TableList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delete_id: 0,
    }
  }

  render(){

    const {data, loading, update_data} = this.props;
    const { dispatch, todos } = this.props;

    const delete_data = (id) => {
      this.setState({
        delete_id: id,
      });
    };

    const to_qrd = (record) => {
      var _url = 'http://qrd.qiyi.domain/ping.html?host='+ record.monitor_obj +'&type='+ record.monitor_type;
      window.open(_url); 
    };

    const confirm = () => {
      notification.open({
        message: '删除监控项',
        description: '正在删除当前项......',
        duration: 1
      });

      dispatch({
        type: 'todos/deleteTask',
        values: this.state.delete_id
      });
    };

    const alarm_create = (record) => {
      dispatch({ // 跳转之前执行获得报警对象列表
        type: 'todos/getAlarmUser'
      });

      dispatch({
        type: 'todos/alarmCreate',
        payload: record,
      });

      dispatch({
        type: 'todos/getMetricCharts',
        // payload: record.id,
        payload: record,
      });


      dispatch({
        type: 'transmitId',
        payload: record.id,
      });
      browserHistory.push('/qsm/alarm/create');
    };

    const detail_info = (record) => {
      dispatch({
        type: 'put/detailInfo',
        payload: record,
      });
      browserHistory.push('/qsm/detail');

      dispatch({
        type: 'todos/getTaskCharts',
        payload: record,
      });
      dispatch({
        type: 'todos/getTask',  
        id: record.id,
      });
      dispatch({
        type: 'todos/getMetricCharts',
        payload: record
      });

      // history.pushState("", "", "#" + record.id + "#" + record.monitor_type + "#" + record.name + "#" + record.monitor_obj + "#" + record.monitor_rate);
      history.pushState("", "", "#" + record.id + "#" + record.monitor_type);


      // dispatch({
      //   type: 'todos/getlatestdata',
      //   payload: record.id,
      // });
    };

    const cancel = () => {
      return;
    };

    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => detail_info(record)}>{text}</a>
      )
    },{
      title: '监控对象',
      dataIndex: 'monitor_obj',
      key: 'monitor_obj',
    },{
      title: '监控类型',
      dataIndex: 'monitor_type',
      key: 'monitor_type'
    },{
      title: '监控频率',
      dataIndex: 'monitor_rate',
      key: 'monitor_rate'
    },{
      title: '监控状态',
      dataIndex: 'monitor_state',
      key: 'monitor_state',
      render: (text) => {
        if(text == 0){
          return (<span style={{color: '#339933',}}><i style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#339933', display: 'inline-block', margin: '0 2px 0 0'}}></i>正常</span>);
        }else if(text > 0){
          return (<span style={{color: '#CC3333',}}><i style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#CC3333', display: 'inline-block', margin: '0 2px 0 0'}}></i>有{text}个异常</span>);
        }else{
          return (<span style={{color: '#999',}}><i style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#999', display: 'inline-block', margin: '0 2px 0 0'}}></i>未配置告警策略</span>);
        }
      }
    },{
      title: '探测点',
      dataIndex: 'nodes_count',
      //className:'text_center',
      key: 'nodes_count',
      render: (text) => {
        return (<p style={{backgroundColor:'#339933',color:'#fff',width:'50%',textAlign:'center',borderRadius:'5px'}}>{text}</p>);
      }
    },{
      title: '响应时间',
      dataIndex: 'res_time',
      key: 'res_time',
      render: (text, record) => (
        <a onClick={() => detail_info(record)}>{text}</a>
      )
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => alarm_create(record)}>添加报警策略</a>
          <span className="ant-divider" />
          <a onClick={() => update_data(record)}>修改</a>
          <span className="ant-divider" />
          <Popconfirm title="你确定删除么？" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
            <a onClick={() => delete_data(record.id)}>删除</a>
          </Popconfirm>
          <span className="ant-divider" />
          <a onClick={() => to_qrd(record)}>即时探测</a>
        </span>
      )
    }];

    return (
      <Table columns={columns} dataSource={data} loading={loading} pagination={{pageSize: 5}} />
    );
  }
}

TableList.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.any,
  update_data: PropTypes.func
};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(TableList);