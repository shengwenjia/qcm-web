import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Breadcrumb, Button, Input, Table, message } from 'antd';

import styles from './MonitorDetails.less';

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';

class BaseServerQuota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      private_ip: '',
    }
  }

  render() {
    const { todos, dispatch } = this.props;

    /********** 将 IP 添加到页面 url 上 ************/    
    if(typeof(todos.dispatchReducer.baseServerId.server_ip) != 'undefined'){
      const server_ip = todos.dispatchReducer.baseServerId.server_ip;

      history.pushState("", "", "?serverip="+server_ip); // 页面不刷新的同时改变 url
    }

    /********** 输入框默认显示的 IP ************/
    const private_ip = getUrlParam();

    /*********** 表格配置项 ***********/
    const columns = [{
      title: '监控项',
      dataIndex: 'monitor',
      key: 'monitor'
    },{
      title: '指标名',
      dataIndex: 'target_name',
      key: 'target_name'
    },{
      title: '最新检测时间',
      dataIndex: 'last_checkTime',
      key: 'last_checkTime'
    },{
      title: '值',
      dataIndex: 'value',
      key: 'value',
      width: '400px'
    },{
      title: 'Change',
      dataIndex: 'Change',
      key: 'Change'
    },{
      title: 'Graph',
      key: 'Graph',
      render: (record, index) => {
        return (
          <span>
            <Link to = '/qam/qdm/monitor-details/baseserver/quota/details' onClick={() => this.handleClick(record)}>Graph</Link>
          </span>          
        );
      }
    }];

    /************ 表格显示数据 *************/
    const loading = todos.getQdmDetailsData.loading;
    const dataSource = todos.getQdmDetailsData.serverquerymetrics;
    const data = [];
    if(dataSource.length > 0){
      for(var value of dataSource){
        const deal_data = {          
          monitor: value.metric,
          target_name: value.item_name,
          last_checkTime: new Date(value.lastclock * 1000).toLocaleString(),
          value: value.value,
          Change: value.change,
          itemId: value.itemid,
          value_type: value.value_type,
          server: value.server
        };

        data.push(deal_data);
      }
    }

    /************ 配置分页器选项 *************/
    const pagination = {
      total: data.length,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('Current:', current, '; PageSize', pageSize);
      },
      onChange: (current) => {
        console.log('Current:', current);
      }
    };
    /* 表格配置项 end */

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
              <Breadcrumb.Item>
                更多指标
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content_details}>
              <div className={styles.monitor_type}>
                <div className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>服务器IP：</label>
                  <div style={{ width: 120, display: 'inline-block' }}>
                    <Input defaultValue={private_ip} onChange={this.handleChange.bind(this)} />
                  </div>
                </div>
                <div className={styles.search_input}>
                  <Button onClick={this.handleSearchClick.bind(this)}>查询</Button>
                </div>
              </div>
              <div>
                <Table className={styles.td_overlong} columns={columns} dataSource={data} pagination={pagination} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ); 
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const private_ip = getUrlParam();

    dispatch({
      type: 'todos/getQdmServerQueryMetrics',
      ip: private_ip
    })
  }

  handleClick(record) {
    const private_ip = getUrlParam();

    this.props.dispatch({
      type: 'baseServer/quota',
      payload: record,
    })

    this.props.dispatch({ // 重置服务器 ip
      type: 'baseServer/details',
      payload: private_ip,
    });
  }

  handleSearchClick(){
    const checkIp = new RegExp('^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$');

    if(this.state.private_ip == ''){
      message.info('请更换需要查询的服务器IP', 2);
    }else if(!checkIp.test(this.state.private_ip)){
      message.error('请输入正确的服务器IP', 1.5);
    }else{
      this.props.dispatch({ // 重新请求接口
        type: 'todos/getQdmServerQueryMetrics',
        ip: this.state.private_ip
      });
      this.props.dispatch({ // 重置服务器 ip
        type: 'baseServer/details',
        payload: this.state.private_ip,
      });

      history.pushState("", "", "?serverip="+this.state.private_ip); // 页面不刷新的同时改变 url
    }
  }

  handleChange(e){
    if(e.target.value != ''){
      this.setState({
        private_ip: e.target.value,
      })
    }
  }

}

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return { todos: filter(todos) };
}

function getUrlParam(){
  var str = location.href; // 获得输入框的 url
  var num = str.indexOf('?');
  str = str.substr(num + 1);
  var params = str.split('=');
  const private_ip = params[1];

  return private_ip;
}

export default connect(mapStateToProps)(BaseServerQuota);