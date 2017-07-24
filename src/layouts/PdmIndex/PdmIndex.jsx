import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Checkbox, Button, Spin, Icon, Timeline, Modal, Table, Input, Form, Row, Col, Select, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import PdmTable from '../../components/PdmTable/PdmTable';
import FlowChart from '../../components/FlowChart/FlowChart';

import styles from './PdmIndex.less';

const countTime = 60; // 倒计时
var timer; // 初始化定时器
var alarm_timer; // 初始化报警日志定时器
const alarmLogs = []; // 全部告警日志
const topomap_id = 1; // 默认拓扑图的ID

const FormItem = Form.Item;
const Option = Select.Option;
let uuid = 0;
let temporary_server = []; // 初始化机器列表
let channel_detail_ids = []; //生成新拓扑图数据
var todeletechannelid = null;
var savenewchannelid = false;
var search_tmp_broadcast_list = [];

class PdmIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      opacity: '1',
      countDown: countTime,
      data: {},
      topodata: [],
      initChecked: true,
      initAlarmChecked: true,
      initListChecked: true,
      initTemporaryChecked: false,
      temporary_visiable: 'hidden',
      alarm_log_style: {
        display: 'block',
      },
      list_style: {
        display: 'block',
        overflow: 'hidden'
      },
      temporary_info_style: {
        display: 'block'
      },
      temporary_add_style: {
        display: 'none'
      },
      search_tmp_broadcast_list: search_tmp_broadcast_list
    };
  }

  componentWillReceiveProps(nextProps) {
    const { todos, dispatch } = nextProps;

    if(todos.getQdmIndexData.data){
      this.setState({
        data: todos.getQdmIndexData.data.summary,
        topodata: todos.getQdmIndexData.data.toponodes_alarm_summary,
      });
    }
    if(todos.getQdmIndexAlarmLog.data.length > 0){
      if(alarmLogs.toString() != todos.getQdmIndexAlarmLog.data.toString()){
        for(var value of todos.getQdmIndexAlarmLog.data){
          alarmLogs.push(value);
        }
        dispatch({
          type: 'todos/getQdmIndexAlarmLog/init'
        });
      }
    }
    if(todos.getQdmIndexData.tmp_broadcast_list){
      search_tmp_broadcast_list = todos.getQdmIndexData.tmp_broadcast_list;
      this.setState({
        search_tmp_broadcast_list: todos.getQdmIndexData.tmp_broadcast_list
      });
    }
  }

  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [],
    });
  }

  render(){
    /* 报警日志控制滚动条 begin */
    //const log = document.getElementById('alarm_log');
    /************* 每秒刷新的时候滚动轴不能控制bug 未解决***************/
    // if(log != null){
    //   log.scrollTop = log.scrollHeight;
    // }

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

    const { dispatch, todos } = this.props;
    const { loading, querytmpbroadcastlistloading, tmp_broadcast_list, isopenaddtmp, tmpsummarydata } = todos.getQdmIndexData;

    const alarm_style = {
      color: '#D53333',
      padding: '5px',
    };
    const ok_style = {
      color: '#339933',
      padding: '5px',
    };

    /* 循环输出报警日志 */
    const alarm_log_item = []; // 告警日志列表信息
    if(alarmLogs.length > 0){
      for(var i = 0; i < alarmLogs.length; i++){
        const alarm = alarmLogs[i].toponode_name + ' ' +alarmLogs[i].task_name + ' ' + alarmLogs[i].metric + ' ' + alarmLogs[i].status;
        const unixTime = new Date(alarmLogs[i].time * 1000);
        // const commonTime = unixTime.toLocaleString();
        const commonTime = logdateformat(alarmLogs[i].time);
        if(alarmLogs[i].status == 'ok'){
          const item = <Timeline.Item key={i} dot={<Icon type="clock-circle-o" style={{ color: '#339933' }} />}><b>{commonTime}</b><span style={ok_style}>{alarm}</span></Timeline.Item>
          alarm_log_item.push(item);
        }else{
          const item = <Timeline.Item key={i} dot={<Icon type="clock-circle-o" style={{ color: '#D53333' }} />}><b>{commonTime}</b><span style={alarm_style}>{alarm}</span></Timeline.Item>
          alarm_log_item.push(item);
        }
      }
      //alarm_log_item.reverse(); // 反转数组顺序，使最新数据在显示在最上面
    }
    
    /* 表格所需数据 */
    let link_value = '0';
    let link_details = '0/0';
    let link_value_item = '0';
    let link_details_item = '0/0';

    let idc_value = '0';
    let idc_details = '0/0';
    let idc_value_item = '0';
    let idc_details_item = '0/0';

    let server_value = '0';
    let server_details = '0/0';
    let server_value_item = '0';
    let server_details_item = '0/0';

    let total_value = '0';
    let total_details = '0/0';
    let total_value_item = '0';
    let total_details_item = '0/0';

    if(isopenaddtmp && tmpsummarydata.summary) {

        link_value = tmpsummarydata.summary.linktask.task_enable_count;
        link_details = link_value +'/'+ tmpsummarydata.summary.linktask.task_disable_count;
        link_value_item = tmpsummarydata.summary.linktask.alarm_error_count;
        link_details_item = link_value_item +'/'+ tmpsummarydata.summary.linktask.alarm_total_count;

        idc_value = tmpsummarydata.summary.idctask.task_enable_count;
        idc_details = idc_value + '/' + tmpsummarydata.summary.idctask.task_disable_count;
        idc_value_item = tmpsummarydata.summary.idctask.alarm_error_count;
        idc_details_item = idc_value_item + '/' + tmpsummarydata.summary.idctask.alarm_total_count;

        server_value = tmpsummarydata.summary.servertask.task_enable_count;
        server_details = server_value + '/' + tmpsummarydata.summary.servertask.task_disable_count;
        server_value_item = tmpsummarydata.summary.servertask.alarm_error_count;
        server_details_item = server_value_item + '/' + tmpsummarydata.summary.servertask.alarm_total_count;

        var total_details_after = parseInt(tmpsummarydata.summary.linktask.task_disable_count) + parseInt(tmpsummarydata.summary.idctask.task_disable_count) + parseInt(tmpsummarydata.summary.servertask.task_disable_count);
        var total_details_item_after = parseInt(tmpsummarydata.summary.linktask.alarm_total_count) + parseInt(tmpsummarydata.summary.idctask.alarm_total_count) + parseInt(tmpsummarydata.summary.servertask.alarm_total_count);
        total_value = parseInt(link_value) + parseInt(idc_value) + parseInt(server_value);
        total_details = total_value + '/' + total_details_after;
        total_value_item = parseInt(link_value_item) + parseInt(idc_value_item) + parseInt(server_value_item);
        total_details_item = total_value_item + '/' + total_details_item_after;
    } else {
      if(this.state.data){
        const link_data = this.state.data.linktask;
        const idc_data = this.state.data.idctask;
        const server_data = this.state.data.servertask;
        const total_data = this.state.data.total;

        if(typeof(link_data) != 'undefined'){
          link_value = link_data.task_enable_count;
          link_details = link_value +'/'+ link_data.task_disable_count;
          link_value_item = link_data.alarm_error_count;
          link_details_item = link_value_item +'/'+ link_data.alarm_total_count;
        }
        if(typeof(idc_data) != 'undefined'){
          idc_value = idc_data.task_enable_count;
          idc_details = idc_value + '/' + idc_data.task_disable_count;
          idc_value_item = idc_data.alarm_error_count;
          idc_details_item = idc_value_item + '/' + idc_data.alarm_total_count;
        }
        if(typeof(server_data) != 'undefined'){
          server_value = server_data.task_enable_count;
          server_details = server_value + '/' + server_data.task_disable_count;
          server_value_item = server_data.alarm_error_count;
          server_details_item = server_value_item + '/' + server_data.alarm_total_count;
        }
        if(typeof(total_data) != 'undefined'){
          total_value = total_data.task_enable_count;
          total_details = total_value + '/' + total_data.task_disable_count;
          total_value_item = total_data.alarm_error_count;
          total_details_item = total_value_item + '/' + total_data.alarm_total_count;
        }
      }else{
        // 不处理
      }
    }

    const dataSource_link = [{
      key: 0,
      param_name: '监控项数(开启/关闭)',
      value: link_value,
      details: link_details
    },{
      key: 1,
      param_name: '告警数(异常/总数)',
      value: link_value_item,
      details: link_details_item
    }];
    const dataSource_flow = [{
      key: 0,
      value: idc_value,
      details: idc_details
    },{
      key: 1,
      value: idc_value_item,
      details: idc_details_item
    }];
    const dataSource_server = [{
      key: 0,
      value: server_value,
      details: server_details
    },{
      key: 1,
      value: server_value_item,
      details: server_details_item
    }];
    const dataSource_device = [{
      key: 0,
      value: '0',
      details: '0/0'
    },{
      key: 1,
      value: '0',
      details: '0/0'
    }];
    const dataSource_sum = [{
      key: 0,
      value: total_value,
      details: total_details,
    },{
      key: 1,
      value: total_value_item,
      details: total_details_item,
    }];

    /************** 表格配置文件 ***************/
    const columns = [{
      title: '频道ID',
      dataIndex: 'channel_id',
      width: 200,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            style={{ width: "50%" }}
            placeholder="输入频道ID"
            onPressEnter={this.onSearch.bind(this)}
          />
          <Button type="primary" onClick={this.onSearch.bind(this)}>Search</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
    }, {
      title: '直播名',
      dataIndex: 'channel_name',
      width: 300
    }, {
      title: '流类型',
      dataIndex: 'stream_type',
      width: 250
    }, {
      title: '格式类型',
      dataIndex: 'format_type',
      width: 150
    }, {
      title: 'CUTTER IP',
      dataIndex: 'cutter_ip',
      width: 200
    }, {
      title: 'ENCODE IP',
      dataIndex: 'encode_ip',
      width: 200
    }, {
      title: 'RTMP IP',
      dataIndex: 'rtmp_ip',
      width: 200
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      width: 300,
      render: (text) => dateformat({text})
    }, {
      title: '操作',
      dataIndex: 'id',
      width: 100,
      render: (record, index) => {
        return (
          <Popconfirm title="Are you sure delete this channel?" data-chid={record} onConfirm={this.deleteTmpChannel.bind(this)} okText="Yes" cancelText="No">
            <a data-chid={record} onClick={this.gettodeleteTmpChannelid.bind(this)}>删除</a>
          </Popconfirm>
        );
      }
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        channel_detail_ids = selectedRows;
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
        channel_detail_ids = selectedRows;
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
        channel_detail_ids = selectedRows;
      },
      // getCheckboxProps: record => ({
      //   disabled: record.name === 'Disabled User',    // 禁止选中的行
      // }),
    };
    const locale = {
      emptyText: '请添加临时监控信息'
    };

    /***************** 表单配置信息 *******************/
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 16, offset: 4 },
    };
    getFieldDecorator('keys', { initialvalue: [] });
    var keys = getFieldValue('keys');

    if(!keys) {
      keys = [];
    }

    const formItems = keys.map((k, index) => {
      return (
        <FormItem 
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} 
        label={index === 0 ? '机器列表' : ''} 
        require={false} 
        key={k}>
          <Row gutter={8}>
            <Col span={11}>
              <Input placeholder='请输入机器列表' data-index={index} onChange={this.serverChange} />
            </Col>
            <Col span={11}>
              <Select 
              defaultValue='0' 
              onChange={
                (value) => {
                  temporary_server[index].server = value;
                }
              }>
                <Option value="0">RMPSERVER1</Option>
                <Option value="1">RMPSERVER2</Option>
              </Select>
            </Col>
            <Col span={2}>
              <Icon className='dynamic-delete-button' 
              type="minus-circle-o" 
              disabled={keys.length === 1} 
              onClick={() => this.remove(k)} />
            </Col>
          </Row>
        </FormItem>
      );
    });

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
              <Breadcrumb.Item>直播链路监控</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.content_unit}>
                <div className={styles.unit}>
                  <Checkbox onChange={this.onChange_temporary.bind(this)} defaultChecked={this.state.initTemporaryChecked}>临时直播</Checkbox>
                  <a style={{margin: '0 10px 0 -5px', visibility: this.state.temporary_visiable }} title='点击创建临时直播' onClick={this.createTemporary.bind(this)}><Icon type='plus' /></a>
                  <Checkbox onChange={this.onChange_list.bind(this)} defaultChecked={this.state.initListChecked}>查看列表信息</Checkbox>
                  <Checkbox onChange={this.onChange_alarm.bind(this)} defaultChecked={this.state.initAlarmChecked}>查看告警信息</Checkbox>
                  <Checkbox onChange={this.onChange.bind(this)} defaultChecked={this.state.initChecked}>定时刷新</Checkbox>
                  <span style={{color: 'red', padding: '0', opacity: this.state.opacity}}>{this.state.countDown}</span>
                </div>
              </div>
              <div style={this.state.list_style}>
                <div className={styles.pdm_view_first}>
                  <Link to='/qam/qdm/monitor-details/netlink'>
                    <h3 style={{paddingBottom: '10px'}} title='点击查看网络链路详情'>网络链路</h3>
                  </Link>
                  <PdmTable data={dataSource_link} loading={loading} hasParamName={true} linkUrl={'/qam/qdm/monitor-details/netlink'} />
                </div>
                <div className={styles.pdm_view}>
                  <Link to='/qam/qdm/monitor-details/idclink'>
                    <h3 style={{paddingBottom: '10px'}} title='点击查看专线流量详情'>专线流量</h3>
                  </Link>                
                  <PdmTable data={dataSource_flow} loading={loading} hasParamName={false} linkUrl={'/qam/qdm/monitor-details/idclink'} />
                </div>
                <div className={styles.pdm_view}>
                  <Link to='/qam/qdm/monitor-details/baseserver'>
                    <h3 style={{paddingBottom: '10px'}} title='点击查看基础服务器详情'>基础服务器</h3>
                  </Link>                
                  <PdmTable data={dataSource_server} loading={loading} hasParamName={false} linkUrl={'/qam/qdm/monitor-details/baseserver'} />
                </div>
                {/*<div className={styles.pdm_view}>
                  <Link title='点击查看专有设备详情'>
                    <h3 style={{paddingBottom: '10px'}}>专有设备</h3>
                  </Link>                
                  <PdmTable data={dataSource_device} loading={loading} hasParamName={false} />
                </div>*/}
                <div className={styles.pdm_view}>
                  <Link>
                    <h3 style={{paddingBottom: '10px'}} title='点击查看合计详情'>合计</h3>
                  </Link>                
                  <PdmTable data={dataSource_sum} loading={loading} hasParamName={false} />
                </div>
              </div> 
              <div id='alarm_log' className={styles.alarm_log} style={this.state.alarm_log_style}>
                <Timeline>
                {alarm_log_item}
                </Timeline>
              </div>
            </div>            
            <div className={styles.flow_chart}>
              {/*<h1 style={{textAlign: 'center',}}>业务拓扑图<span style={{fontSize: '14px', paddingLeft: '5px'}}>(异常/总数)</span></h1>*/}
              <FlowChart data={this.state.topodata} />
            </div>
          </div>
        </div>
        <Modal 
        title="临时监控" 
        className="temp_broadcastmodal"
        visible={this.state.visible} 
        onOk={this.handleOk.bind(this)} 
        onCancel={this.handleCancel.bind(this)} 
        footer='' 
        okText="生成拓扑图">
          <div style={this.state.temporary_info_style}>
            <span style={{float: 'right'}}>
              <Button type='primary' size='small' style={{margin: '0 5px 5px 0'}} onClick={this.addTemporary.bind(this)}>添加直播</Button>
              <Button type='primary' size='small' style={{margin: '0 5px 5px 0'}} onClick={this.handleOk.bind(this)} disabled={channel_detail_ids.length==0}>生成拓扑图</Button>
            </span>
            <Table pagination={false} scroll={{ y: 400 }} loading={querytmpbroadcastlistloading} rowSelection={rowSelection} columns={columns} dataSource={search_tmp_broadcast_list} locale={locale} size='small' style={{clear: 'both'}} />
          </div>
          <div style={this.state.temporary_add_style}>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
              <FormItem 
              {...formItemLayout} 
              label='节目ID：'>
                <Row gutter={8}>
                  <Col span={18}>
                    {getFieldDecorator('act_id',{
                      initialValue: '',
                    })(
                      <Input type="number" />
                    )}
                  </Col>
                </Row>
              </FormItem>
              <FormItem 
              {...formItemLayout} 
              style={{ display: "none" }}
              label='直播项目名'>
                {getFieldDecorator('act_name',{
                  initialValue: ''
                })(
                  <Input />
                )}
              </FormItem>
              {formItems}
              <FormItem 
              style={{ display: "none" }}
              {...formItemLayoutWithOutLabel}>
                <Button type='dashed' onClick={this.add.bind(this)} style={{width:'60%'}}>
                  <Icon type="plus" /> 添加机器列表
                </Button>
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col offset={6} span={4}>
                    <Button htmlType='submit' type='primary' onClick={this.handleSave.bind(this)}>保存</Button>
                  </Col>
                  <Col span={12}>
                    <Button htmlType='submit' type='primary' onClick={this.handleBack.bind(this)}>返回</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'todos/getQdmIndexData',
      topo_id: 1
    });
    this.props.dispatch({ // 请求最近的报警日志
      type: 'todos/getQdmIndexAlarmLog',
      topomap_id: topomap_id,
      channel_detail_ids: []
    });

    timer = setInterval(() => {
      this.setTimer();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(timer);
    alarmLogs.splice(0, alarmLogs.length);
  }

  setTimer(){ // 设置定时器
    var countTimer = this.state.countDown - 1;
    const now = new Date();
    const endTime = Math.round(now.getTime()/1000); // 日志结束请求时间
    const startTime = Math.round(now.setMinutes(now.getMinutes() - 1) / 1000); // 日志开始请求时间

    if(countTimer < 0){
      this.setState({
        countDown: countTime
      });

      if(this.props.todos.getQdmIndexData.isopenaddtmp && channel_detail_ids.length > 0) {
        this.props.dispatch({ // 请求最近一分钟的报警日志
          type: 'todos/getQdmIndexAlarmLog',
          topomap_id: topomap_id,
          start: startTime,
          end: endTime,
          channel_detail_ids: channel_detail_ids
        });
        this.props.dispatch({
          type: 'todos/querytmpsummarydata',
          channel_detail_ids: channel_detail_ids
        });
      } else {
        this.props.dispatch({ // 重新请求接口数据
          type: 'todos/getQdmIndexData',
          topo_id: 1
        });
        this.props.dispatch({ // 请求最近一分钟的报警日志
          type: 'todos/getQdmIndexAlarmLog',
          topomap_id: topomap_id,
          start: startTime,
          end: endTime,
          channel_detail_ids: []
        });
      }
    }else{
      this.setState({
        countDown: countTimer
      }); 
    }
  }

  /*
   * 点击循环任务方法
   */
  onChange(e) {
    if(e.target.checked){
      console.log('begin');
      this.setState({
        opacity: '1',
        countDown: countTime,
      });
      timer = setInterval(() => {
        this.setTimer();
      }, 1000);
    }else{
      console.log('stop');
      clearInterval(timer);

      this.setState({
        opacity: '0',
      });
    }
  };
  /*
   * 点击查看或关闭报警日志
   */
  onChange_alarm(e) {
    if(e.target.checked){
      this.setState({
        alarm_log_style: {
          display: 'block',
        }
      });
    }else{
      this.setState({
        alarm_log_style: {
          display: 'none',
        }
      });
    }
  }
  /********* 查看或关闭列表信息 ***********/
  onChange_list(e) {
    if(e.target.checked){
      this.setState({
        list_style: {
          display: 'block',
          overflow: 'hidden'
        }
      });
    }else{
      this.setState({
        list_style: {
          display: 'none',
          overflow: 'hidden'
        }
      });
    }
  }
  /*************** 是否开启临时直播 *****************/
  onChange_temporary(e){
    if(e.target.checked){
      this.setState({
        temporary_visiable: 'visible',
      });
      this.props.dispatch({
        type: 'todos/querytmpbroadcastlist'
      });
      this.props.dispatch({
        type: 'todos/isopenaddtmp',
        isopenaddtmp: true
      });
    }else{
      this.setState({
        temporary_visiable: 'hidden',
      });
      this.props.dispatch({
        type: 'todos/isopenaddtmp',
        isopenaddtmp: false
      });
    }
  }
  /*************** 创建临时直播 ******************/
  createTemporary() {
    temporary_server = []; // 开始创建时初始化机器列表
    this.props.form.setFieldsValue({
      keys: [],
      act_id: '',
      act_name: '',
    });

    this.setState({
      visible: true,
      temporary_info_style: {
        display: 'block'
      },
      temporary_add_style: {
        display: 'none'
      },
    });
  }
  /*********** 模态框确定或取消 ************/
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
    this.props.dispatch({ // 请求最近的报警日志
      type: 'todos/getQdmIndexAlarmLog',
      topomap_id: topomap_id,
      channel_detail_ids: []
    });
    this.setState({
      countDown: countTime
    }); 
    this.props.dispatch({
      type: 'todos/querytmpsummarydata',
      channel_detail_ids: channel_detail_ids
    });
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,      
    });
  }
  /************* 添加直播 *****************/
  addTemporary() {
    this.setState({
      temporary_info_style: {
        display: 'none'
      },
      temporary_add_style: {
        display: 'block'
      }
    });
  }
  handleBack() {
    savenewchannelid = false;
    this.setState({
      temporary_info_style: {
        display: 'block'
      },
      temporary_add_style: {
        display: 'none'
      }
    });
  }
  /************** 表格新增机器列表 ******************/
  add() {
    uuid++;
    temporary_server.push({server_name: '', server: '0'});

    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextkeys = keys.concat(uuid);
    form.setFieldsValue({
      keys: nextkeys,
    });
  }
  remove(k) {
    temporary_server.pop();

    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if(keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  serverChange(e){
    const index = parseInt(e.target.getAttribute('data-index'));    
    temporary_server[index].server_name = e.target.value.trim();
  }
  /**************** 同步乐高 ****************/
  syncLego(){
    console.log('开始同步乐高...');
  }
  /************ 表单提交 *************/
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        const post_data = {
          act_id: values.act_id, // 节目id
          act_name: values.act_name, // 节目名称
          server_list: temporary_server // 机器列表
        };
        if(savenewchannelid) {
            this.props.dispatch({
              type: 'todos/addactid',
              channel_id: post_data.act_id
            });

            this.setState({
              temporary_info_style: {
                display: 'block'
              },
              temporary_add_style: {
                display: 'none'
              }
            });
        }
      }
    });
  }

  handleSave() {
    savenewchannelid = true;
  }

  deleteTmpChannel(data) {
    this.props.dispatch({
      type: 'todos/deletetmpbroadcastlist',
      channel_detail_id: todeletechannelid
    });
    var self = this;
    setTimeout(function() {
      self.props.dispatch({
        type: 'todos/querytmpbroadcastlist'
      });
    }, 500);
  }

  gettodeleteTmpChannelid(data) {
      todeletechannelid = parseInt(data.target.getAttribute("data-chid"));
      console.log("todeletechannelid: " + todeletechannelid);
  }

  onSearch() {
      search_tmp_broadcast_list = [];
      const searchText = $(".custom-filter-dropdown input").val().trim();
      if(searchText == '') {
        search_tmp_broadcast_list = this.props.todos.getQdmIndexData.tmp_broadcast_list;
        console.log(search_tmp_broadcast_list);
        this.setState({
          search_tmp_broadcast_list: search_tmp_broadcast_list
        });
        return;
      }
      for(var i = 0; i < this.props.todos.getQdmIndexData.tmp_broadcast_list.length; i++) {
        if(searchText == this.props.todos.getQdmIndexData.tmp_broadcast_list[i]['channel_id']) {
            search_tmp_broadcast_list.push(this.props.todos.getQdmIndexData.tmp_broadcast_list[i]);
        }
      }
      this.setState({
        search_tmp_broadcast_list: search_tmp_broadcast_list
      });
  }

}

PdmIndex = Form.create({})(PdmIndex);

PdmIndex.propTypes = {};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(PdmIndex);