import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Tabs, Radio, Select, Table, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from './MonitorDetails.less';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import Complete from '../../components/Complete/Complete';

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const topomap_id = 1; // 默认拓扑图的ID值

/* 显示状态样式 */
const ok_status = {
  color: '#339933',
  fontSize: '16px',
};
const error_status = {
  color: '#CC3333',
  fontSize: '16px',
};

class NetLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src_ip: '',
      dst_ip: '',
      status: 0, // 默认正常
      offset: 0,
      row: 10,
      current: 1,
      select: '0'
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
    if(status != ''){
      this.setState({
        status: status ? status : 0, // 存在查询节点，状态置为异常
      }) 
    }
  }

  render() {
    const { todos, dispatch } = this.props;
    const getDataLoading = todos.getQdmDetailsData.loading;

    /****** 获取表格数据 *******/
    const netLinkData = todos.getQdmDetailsData.netdata;
    var total_count = 0;
    const data = []; // 初始化表格显示数据
    if(typeof(netLinkData.total_count) != 'undefined'){
      total_count = netLinkData.total_count;
      for(var value of netLinkData.data){ // 绑定表格数据
        if(value.response == '-' || value.response == 'error' || value.loss == '-' || value.loss == 'error'){
          const deal_data = {
            task_id: value.task_id,
            status: value.status,
            source_ip: value.src_ip,
            target_ip: value.dst_ip,
            res_time: value.response,
            lostage: value.loss
          };
          data.push(deal_data);
        }else{
          const deal_data = {
            task_id: value.task_id,
            status: value.status,
            source_ip: value.src_ip,
            target_ip: value.dst_ip,
            res_time: parseFloat(value.response).toFixed(2) + 'ms',
            lostage: value.loss + '%'
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

    /******* 定义表格配置 *******/
    const columns = [{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      className: 'text_center',    
      render: (text, record, index) => {
        if(text == 0){
          return (<Icon type="check-circle" style={ok_status} />);
        }else{
          return (<Icon type="close-circle" style={error_status} />);
        }        
      }
    },{
      title: '源IP',
      dataIndex: 'source_ip',
      key: 'source_ip',
      className: 'text_center',
    },{
      title: '目标IP',
      dataIndex: 'target_ip',
      key: 'target_ip',
      className: 'text_center',
    },{
      title: '响应时间',
      dataIndex: 'res_time',
      key: 'res_time',
      className: 'text_center',
      render: (text, record, index) => {
        const res_time = text;
        return (<span>{res_time}</span>);
      }
    },{
      title: '丢包率',
      dataIndex: 'lostage',
      key: 'lostage',
      className: 'text_center',
      render: (text, record, index) => {
        if(text > 50){
          const lostage = text;
          return (<span style={{color: '#CC3333'}}>{lostage}</span>);
        }else{
          const lostage = text;
          return (<span>{lostage}</span>);
        }
      }
    },{
      title: '操作',
      key: 'action',
      className: 'text_center',
      render: (text, record, index) => {
        return (
          <span>
            <Link to='/qam/qdm/monitor-details/netlink/details' onClick={() => this.handleClick(record)}>查看详情</Link>
          </span>
        );
      }
    }];    

    /******* 定义分页器配置 ******/
    const pagination = { // 分页器配置项
      total: total_count, // 总共的数据数
      showSizeChanger: true,
      current: this.state.current, // 当前显示的页码
      pageSizeOptions: ['10', '20', '30'],
      pageSize: this.state.row,
      onShowSizeChange: (current, pageSize) => {
        //console.log('Current: ', current, '; PageSize: ', pageSize);
        const offset = parseInt((current - 1) * pageSize);
        this.setState({
          current: current,
          row: pageSize,
        });
        dispatch({ // 改变行数的时候重新请求接口
          type: 'todos/getQdmLinkTasks',
          topomap_id: topomap_id,
          status: this.state.status,
          offset: offset,
          row: pageSize,
          toponode_id: this.state.select,
        });
      },
      onChange: (current) => {
        const offset = parseInt((current - 1) * this.state.row);
        this.setState({
          current: current,
        });
        dispatch({ // 翻页的时候重新请求接口
          type: 'todos/getQdmLinkTasks',
          topomap_id: topomap_id,
          status: this.state.status,
          offset: offset,
          row: this.state.row,
          toponode_id: this.state.select,
        });
      },
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
              <Breadcrumb.Item>网络链路监控</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>            
              <div className={styles.monitor_type}>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>业务环节：</label>                  
                   <Select style={{ width: 220 }} onChange={this.handleChange.bind(this)} defaultValue={this.state.select}>
                    <Option value="0">所有</Option>
                    {selectOptions}
                  </Select>
                </div>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>状态：</label>                  
                   <Select style={{ width: 120 }} onChange={this.handleChangeStatus.bind(this)} defaultValue={this.state.status.toString()} value={this.state.status.toString()}>
                    <Option value="0">正常</Option>
                    <Option value="1">异常</Option>
                  </Select>
                </div>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>源IP：</label>
                  <div style={{ width: 120, display: 'inline-block' }}>
                    <Input onChange={this.inputValueSec.bind(this)} value={this.state.src_ip} />
                  </div>                   
                </div>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>目标IP：</label>
                  <div style={{ width: 120, display: 'inline-block' }}>
                    <Input onChange={this.inputValueDst.bind(this)} value={this.state.dst_ip} />
                  </div>                   
                </div>
                <div className={styles.search_input}>
                  <Button onClick={this.handleSearchClick.bind(this)}>查询</Button>
                </div>
                <div className={styles.monitor_type_table}>
                  <Table 
                  columns={columns} 
                  dataSource={data} 
                  loading={getDataLoading} 
                  pagination={pagination} 
                  bordered />
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
    const status = todos.dispatchReducer.status; // 通过 reducer 传递的状态信息

    if(toponode_id == '' && status == ''){ // 页面刷新后toponode_ip丢失，默认为0开始请求
      dispatch({
        type: 'todos/getQdmLinkTasks',
        topomap_id: topomap_id,
        status: this.state.status,
        offset: this.state.offset,
        row: this.state.row,
        toponode_id: this.state.select,
      }); 
    }
    if(status != ''){
      dispatch({
        type: 'todos/getQdmLinkTasks',
        topomap_id: topomap_id,
        status: status, // 通过节点查询，默认异常状态查询
        toponode_id: this.state.select,
        offset: this.state.offset,
        row: this.state.row,
      });
    }
    if(toponode_id != ''){
      dispatch({
        type: 'todos/getQdmLinkTasks',
        topomap_id: topomap_id,
        status: status, // 通过节点查询，默认异常状态查询
        toponode_id: toponode_id,
        offset: this.state.offset,
        row: this.state.row,
      });
    }

    dispatch({ // 请求业务环节
      type: 'todos/getQdmLinkTasksToponodes',
      topomap_id: topomap_id,
      toponode_type: 'link'
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

  handleClick(record) {
    console.log(record);
    this.props.dispatch({
      type: 'netLink/details',
      payload: record,
    });
  }

  handleChange(value){
    console.log(value);
    this.setState({
      select: value,
      src_ip: '',
      dst_ip: '',
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

  inputValueSec(e){
    if(e.target.value != ''){
      this.setState({
        src_ip: e.target.value,
      });
    }else{
      this.setState({
        src_ip: '',
      });
    }
  }

  inputValueDst(e){
    if(e.target.value != ''){
      this.setState({
        dst_ip: e.target.value,
      });
    }else{
      this.setState({
        dst_ip: '',
      });
    }  
  }

  handleSearchClick(){
    const { dispatch } = this.props;
    const src_ip = this.state.src_ip;
    const dst_ip = this.state.dst_ip;
    const status = this.state.status;
    const lasted_page = this.state.current;
    const checkIp = new RegExp('^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$');
    
    dispatch({
      type: 'dispatch/status',
      status: ''
    });

    this.setState({ // 点击后跳转到第一页
      current: 1
    });

    if(src_ip == '' || dst_ip == ''){
      dispatch({
        type: 'todos/getQdmLinkTasks',
        topomap_id: topomap_id,
        status: status,
        offset: this.state.offset,
        row: this.state.row,
        toponode_id: this.state.select,
      });
    }else{
      this.setState({ // 重置业务环节
        select: '0',
      });

      if(checkIp.test(src_ip) && checkIp.test(dst_ip)){
        dispatch({
          type: 'todos/getQdmLinkTasks',
          topomap_id: topomap_id,
          status: status,
          offset: this.state.offset,
          row: this.state.row,
          src_ip: src_ip,
          dst_ip: dst_ip,
        });
      }else{
        message.error("IP格式不正确");
        this.setState({ // IP匹配失败，不做请求，跳转到原始页面
          current: lasted_page
        });
      }        
    }
  }

}

NetLink.propTypes = {};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(NetLink);