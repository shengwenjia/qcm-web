import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Tabs, Radio, Table, Icon, Select, Button } from 'antd';
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

/* 表格状态样式 */
const ok_status = {
  color: '#339933',
  fontSize: '16px',
};
const error_status = {
  color: '#CC3333',
  fontSize: '16px',
};

class IdcLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: '0',
      offset: 0,
      row: 20,
      current: 1,
      status: 0, // 默认正常
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
    /********** 获取表格数据 ************/
    const idcData = todos.getQdmDetailsData.idcdata;
    const getDataLoading = todos.getQdmDetailsData.loading;
    var total_count = 0;
    const data = [];
    if(typeof(idcData.total_count) != 'undefined'){
      total_count = idcData.total_count;
      for(var value of idcData.data){
        if(value.threshold == '-' || value.threshold == 'error' || value.idc_traffic_in == '-' || value.idc_traffic_in == 'error' || value.idc_traffic_out == '-' || value.idc_traffic_out == 'error'){
          const deal_data = {
            task_id: value.task_id,
            status: value.status,
            monitor: value.task_name,
            source_idc: value.src_idc,
            target_idc: value.dst_idc,
            broadband_limit: value.threshold,
            entry: value.idc_traffic_in,
            exit: value.idc_traffic_out,
          }
          data.push(deal_data);
        }else{
          const deal_data = {
            task_id: value.task_id,
            status: value.status,
            monitor: value.task_name,
            source_idc: value.src_idc,
            target_idc: value.dst_idc,
            broadband_limit: value.threshold + 'G',
            entry: parseFloat(value.idc_traffic_in).toFixed(2) + 'G',
            exit: parseFloat(value.idc_traffic_out).toFixed(2) + 'G',
          }
          data.push(deal_data);
        }
      }
    }

    /******* 定义表格配置 *******/
    const columns = [{ // 配置表格
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
      title: '监控项',
      dataIndex: 'monitor',
      key: 'monitor',
      className: 'text_center',
    },{
      title: '源IDC',
      dataIndex: 'source_idc',
      key: 'source_idc',
      className: 'text_center',
    },{
      title: '目标IDC',
      dataIndex: 'target_idc',
      key: 'target_idc',
      className: 'text_center',
    },{
      title: '宽带上限',
      dataIndex: 'broadband_limit',
      key: 'broadband_limit',
      className: 'text_center',
      render: (text, record, index) => {
        const broadband_limit_text = text;
        return (<span>{broadband_limit_text}</span>);
      }
    },{
      title: '宽带流量',
      className: 'text_center',
      children: [{
        title: '进口流量',
        dataIndex: 'entry',
        key: 'entry',
        className: 'text_center',
        render: (text, record, index) => {
          const entry_text = text;
          return (<span>{entry_text}</span>);
        }
      },{
        title: '出口流量',
        dataIndex: 'exit',
        key: 'exit',
        className: 'text_center',
      }]
    },{
      title: '操作',
      key: 'action',
      className: 'text_center',
      render: (text, record, index) => {
        return (
          <span>
            <Link to='/qam/qdm/monitor-details/idclink/details' onClick={() => this.handleClick(record)}>查看详情</Link>
          </span>
        );
      }
    }];    

    /******* 定义分页器配置 ******/
    const pagination = {
      total: total_count,
      showSizeChanger: true,
      current: this.state.current,
      pageSizeOptions: ['10', '20', '30'],
      pageSize: this.state.row,
      onShowSizeChange: (current, pageSize) => {
        // console.log('Current:', current, '; PageSize', pageSize);
        const offset = parseInt((current - 1) * pageSize);
        this.setState({
          current: current,
          row: pageSize,
        });
        dispatch({ // 改变行数的时候重新请求接口
          type: 'todos/getQdmIdcTasks',
          topomap_id: topomap_id,
          offset: offset,
          row: pageSize,
          toponode_id: this.state.select,
          status: this.state.status
        });
      },
      onChange: (current) => {
        const offset = parseInt((current - 1) * this.state.row);
        this.setState({
          current: current,
        });
        dispatch({ // 翻页的时候重新请求接口
          type: 'todos/getQdmIdcTasks',
          topomap_id: topomap_id,
          offset: offset,
          row: this.state.row,
          toponode_id: this.state.select,
          status: this.state.status
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
              <Breadcrumb.Item>专线流量监控</Breadcrumb.Item>
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
                <div style={{ display: "none" }} className={styles.search_input}>
                  <label htmlFor='title' style={{paddingRight: '10px'}}>状态：</label>                  
                   <Select style={{ width: 120 }} onChange={this.handleChangeStatus.bind(this)} defaultValue={this.state.status.toString()} value={this.state.status.toString()}>
                    <Option value="0">正常</Option>
                    <Option value="1">异常</Option>
                  </Select>
                </div>
                <div className={styles.search_input}>
                  <Button onClick={this.handleSearchClick.bind(this)}>查询</Button>
                </div>
                <div className={styles.monitor_type_table}>
                  <Table 
                  columns={columns} 
                  dataSource={data} 
                  pagination={pagination} 
                  loading={getDataLoading} 
                  bordered 
                  size='middle' />
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
    /************ 请求业务环节 ************/
    dispatch({
      type: 'todos/getQdmLinkTasksToponodes',
      topomap_id: topomap_id,
      toponode_type: 'idc'
    });
    /******** 请求列表数据 **************/
    const toponode_id = todos.dispatchReducer.toponode_id;
    const status = todos.dispatchReducer.status;

    if(toponode_id == '' && status == ''){ // 页面刷新后toponode_ip丢失，默认为0开始请求
      dispatch({
        type: 'todos/getQdmIdcTasks',
        topomap_id: topomap_id,
        offset: this.state.offset,
        row: this.state.row,
        toponode_id: this.state.select,
        status: this.state.status
      }); 
    }else{
      dispatch({
        type: 'todos/getQdmIdcTasks',
        topomap_id: topomap_id,
        toponode_id: toponode_id,
        offset: this.state.offset,
        row: this.state.row,
        status: this.state.status
      })      
    }
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

  onChange(e){
    console.log(`radio checked:${e.target.value}`);
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
    console.log(record);
    this.props.dispatch({
      type: 'idcLink/details',
      payload: record,
    });
  }

  handleChange(value) {
    console.log(value);
    this.setState({
      select: value,
    });    
  }

  handleSearchClick(){

    this.props.dispatch({
      type: 'dispatch/status',
      status: ''
    });

    this.props.dispatch({
      type: 'todos/getQdmIdcTasks',
      topomap_id: topomap_id,
      toponode_id: this.state.select,
      offset: this.state.offset,
      row: this.state.row,
      status: this.state.status
    });

    this.setState({
      current: 1,
    });
  }

}

IdcLink.propTypes = {};
function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}
export default  connect(mapStateToProps)(IdcLink);