import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Radio, Table, Icon, Select, Input, Button, message } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './MonitorDetails.less';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import Complete from '../../components/Complete/Complete';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const topomap_id = 1; // 默认拓扑图的ID值

/* 表格状态样式 */
const ok_status = {
  color: '#339933',
  fontSize: '16px',
};
const error_status = {
  color: '#CC3333',
  fontSize: '16px',
};

class BaseServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      row: 10,
      current: 1,
      select: '0',
      private_ip: '',
      status: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const toponode_id = nextProps.todos.dispatchReducer.toponode_id; // 网络链路监控接口所需ID
    const status = nextProps.todos.dispatchReducer.status; // 查询状态
    if(toponode_id != ''){
      this.setState({
        select: toponode_id.toString(),
      }) 
    }
    if(status != '') {
        this.setState({
          status: status, // 存在查询节点，状态置为异常
        });
    }
  }

  render() {
    const { todos, dispatch } = this.props;
    const getDataLoading = todos.getQdmDetailsData.loading;

    /*********** 获取表格数据 *************/
    const serverData = todos.getQdmDetailsData.serverdata;
    var total_count = 0;
    const data = [];
    if(typeof(serverData.total_count) != 'undefined'){
      total_count = serverData.total_count;
      for(var value of serverData.data){ // 绑定表格数据
        if(value.response == '-' || value.response == 'error' || value.loss == '-' || value.loss == 'error'){
          const deal_data = {
            task_id: value.task_id,
            status: value.status,
            server_ip: value.private_ip,
            cpu_load: value.cpu_load,
            memory_usage: value.memory_pavaliable,
            connect_num: value.connections
          };
          data.push(deal_data);
        }else{
          const deal_data = {
            task_id: value.task_id,
            status: value.status,
            server_ip: value.private_ip,
            cpu_load: parseFloat(value.cpu_load).toFixed(2),
            memory_usage: parseFloat(value.memory_pavaliable).toFixed(2),
            connect_num: value.connections
          };
          data.push(deal_data);
        }       
      }
    }

    /******* 获取业务环节数据 *******/
    const selectOptions = []; // 搜索框数据
    const toponodes = todos.getQdmDetailsData.toponodes;
    if(toponodes.length > 0){
      for(var i = 0; i < toponodes.length; i++){
        const select_key = 'select' + i;
        const deal_data = <Option key={select_key} value={toponodes[i].id.toString()}>{toponodes[i].name}</Option>
        selectOptions.push(deal_data);
      }
    }

    /**************** 定义表格配置 **************/
    const columns = [{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      className: 'text_center',
      render: (text, record, index) => {
        if(text == '0'){
          return (<Icon type="check-circle" style={ok_status} />);
        }else{
          return (<Icon type="close-circle" style={error_status} />);
        } 
      }
    },{
      title: '服务器IP',
      dataIndex: 'server_ip',
      key: 'server_ip',
      className: 'text_center',
    },{
      title: 'CPU负载',
      dataIndex: 'cpu_load',
      key: 'cpu_load',
      className: 'text_center',
    },{
      title: '内存空闲率',
      dataIndex: 'memory_usage',
      key: 'memory_usage',
      className: 'text_center',
    },{
      title: '连接数',
      dataIndex: 'connect_num',
      key: 'connect_num',
      className: 'text_center',
    },{
      title: '操作',
      key: 'action',
      className: 'text_center',
      render: (text, record, index) => {
        return (
          <span>
            <Link to='/qam/qdm/monitor-details/baseserver/details' onClick={() => this.handleClick(record)}>详情</Link>
            <span className="ant-divider" />
            <Link to='/qam/qdm/monitor-details/baseserver/quota' onClick={() => this.handleClick(record)}>更多指标</Link>
          </span>
        );
      }
    }];     

    /******* 定义分页器配置 ******/
    const pagination = {
      total: total_count, // 总共的数据数
      showSizeChanger: true,
      current: this.state.current, // 当前显示的页码
      pageSizeOptions: ['10', '20', '30'],
      pageSize: this.state.row,
      onShowSizeChange: (current, pageSize) => {
        const offset = parseInt((current - 1) * pageSize);
        this.setState({
          current: current,
          row: pageSize,
        });
        dispatch({ // 改变行数的时候重新请求接口
          type: 'todos/getQdmServerTasks',
          topomap_id: topomap_id,
          offset: offset,
          row: pageSize,
          toponode_id: this.state.select,
          private_ip: null,
          status: this.state.status,
        });
      },
      onChange: (current) => {
        const offset = parseInt((current - 1) * this.state.row);
        this.setState({
          current: current,
        });
        dispatch({ // 翻页的时候重新请求接口
          type: 'todos/getQdmServerTasks',
          topomap_id: topomap_id,
          offset: offset,
          row: this.state.row,
          toponode_id: this.state.select,
          private_ip: null,
          status: this.state.status,
        });
      }
    };

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
              <Breadcrumb.Item>基础服务器监控</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>              
              <div className={styles.monitor_type}>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>业务环节：</label>
                  {/*<Complete dataSource={dataSource} style={{ width: 200 }} placeholder='请输入项目名称' disabled={false} />*/}
                   <Select style={{ width: 220 }} onChange={this.handleChange.bind(this)} defaultValue={this.state.select}>
                    <Option value="0">所有</Option>
                    {selectOptions}
                  </Select>
                </div>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>状态：</label>                  
                   <Select style={{ width: 120 }} onChange={this.handleChangeStatus.bind(this)} value={this.state.status.toString()}>
                    <Option value="0">正常</Option>
                    <Option value="1">异常</Option>
                  </Select>
                </div>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>服务器IP：</label>
                  <div style={{ width: 120, display: 'inline-block' }}>
                    <Input onChange={this.inputValue.bind(this)} value={this.state.private_ip} />
                  </div>
                </div>
                <div className={styles.search_input}>
                  <Button onClick={this.handleSearchClick.bind(this)}>查询</Button>
                </div>
                <div style={{padding: '20px 0'}}>
                  <Table columns={columns} dataSource={data} loading={getDataLoading} pagination={pagination} bordered />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { todos, dispatch } = this.props;
    const toponode_id = todos.dispatchReducer.toponode_id; // 网络链路监控接口所需ID
    const status = todos.dispatchReducer.status;

    if(toponode_id == '' && status == ''){ // 页面刷新后toponode_ip丢失，默认为0开始请求
      dispatch({
        type: 'todos/getQdmServerTasks',
        topomap_id: topomap_id,
        offset: this.state.offset,
        row: this.state.row,
        toponode_id: this.state.select,
        private_ip: null,
        status: status
      }); 
    }

    if(status != '') {
        dispatch({
          type: 'todos/getQdmServerTasks',
          topomap_id: topomap_id,
          offset: this.state.offset,
          row: this.state.row,
          toponode_id: this.state.select,
          private_ip: null,
          status: status
        });
    }

    if(topomap_id != '') {
        dispatch({
          type: 'todos/getQdmServerTasks',
          topomap_id: topomap_id,
          offset: this.state.offset,
          row: this.state.row,
          toponode_id: this.state.select,
          private_ip: null,
          status: status
        });
    }

    dispatch({ // 请求业务环节
      type: 'todos/getQdmLinkTasksToponodes',
      topomap_id: topomap_id,
      toponode_type: 'server'
    });
  }

  componentWillUnmount() {
    this.props.dispatch({ // 清空 id
      type: 'dispatchId/details',
      payload: '',
    })
    this.props.dispatch({ // 清空状态
      type: 'dispatch/status',
      payload: '',
    });
  }

  onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  };

  handleChange(value) {
    this.setState({
      select: value,
      private_ip: '',
    });
  }

  handleChangeStatus(value){
    if(value == '0'){
      this.setState({
        status: 0
      });
    }else{
      this.setState({
        status: 1
      });
    }
  }

  handleClick(record) {
    this.props.dispatch({
      type: 'baseServer/details',
      payload: record,
    });
  }

  handleSearchClick() {
    const { dispatch } = this.props;
    const private_ip = this.state.private_ip;
    const lasted_page = this.state.current;
    const checkIp = new RegExp('^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$');
    const cur_status = this.state.status;

    dispatch({
      type: 'dispatch/status',
      status: ''
    });

    this.setState({ // 点击后跳转到第一页
      current: 1
    });

    if(private_ip == ''){
      dispatch({
        type: 'todos/getQdmServerTasks',
        topomap_id: topomap_id,        
        offset: this.state.offset,
        row: this.state.row,
        toponode_id: this.state.select,
        private_ip: null,
        status: cur_status
      });
    }else{
      this.setState({ // 重置业务环节
        select: '0',
      });

      if(checkIp.test(private_ip)){
        dispatch({
          type: 'todos/getQdmServerTasks',
          topomap_id: topomap_id,
          offset: this.state.offset,
          row: this.state.row,
          toponode_id: null,
          private_ip: private_ip,
          status: cur_status
        });
      }else{
        message.error("IP格式不正确");
        this.setState({ // IP匹配失败，不做请求，跳转到原始页面
          current: lasted_page
        });
      }
    }
    this.setState({
      status: cur_status
    });
  }

  inputValue(e){
    if(e.target.value != ''){
      this.setState({
        private_ip: e.target.value,
      });
    }else{
      this.setState({
        private_ip: '',
      });
    }
  }

}

BaseServer.propTypes = {};

function filter(todos) {
  return { ...todos };
}

function mapStateToProps({ todos }){
  return { todos: filter(todos) };
}

export default connect(mapStateToProps)(BaseServer);