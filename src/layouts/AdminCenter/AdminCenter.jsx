import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Menu, Breadcrumb, Icon, Button, Modal, Form, Input, Radio, Spin } from 'antd';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import styles from './AdminCenter.less';

import TableList from '../../components/TableList/TableList';
import LeftNav from '../../components/leftNav/LeftNav';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';

class AdminCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelectedKeys: ['1'],
      defaultOpenKeys: ['sub1']
    }
  }

  render(){
    const { dispatch, todos } = this.props;
    const { data, loading } = todos.getAllTasks;
    const projects = todos.getProjects.data;// 我的网站分类列表
    const dataSource = [];// 表格的数据源
    const items = [];
    for(let value of projects){
      items.push(<Menu.Item key={value.project_id}><Link onClick={() => this.handleClick(value)}>{value.project_name}</Link></Menu.Item>);
    }
    /*
     * 数据源格式处理
     */
    for(let value of data){
      const rate = parseInt(value.period / 60);
      let status = '';
      if(value.last_monitor_status != null){
          status = value.last_monitor_status;
      }
      
      let res_time = '-';
      // let max_time = '';
      // let min_time = '';
      // if(value.last_response_time != null){
      //   res_time = '平均值:' + value.last_response_time.avg + 'ms  ';
      //   max_time = '最大值:' + value.last_response_time.max + 'ms  ';
      //   min_time = '最小值:' + value.last_response_time.min + 'ms';
      // }
      if(value.last_response_time != null){
        res_time = value.last_response_time.toFixed(2) + 'ms';
      }
      const dealData = {
        key: value.task_id,
        id: value.task_id,
        name: value.task_name,
        monitor_obj: value.target,
        monitor_type: value.type,
        monitor_rate: rate + '分钟',
        monitor_state: status,
        nodes_count: value.nodes_count,
        // res_time: res_time + max_time + min_time,
        res_time: res_time,
      }
      dataSource.push(dealData);
    }
    /*
     * 修改
     */
    const update_data = (values) => {
      if(values.monitor_type == 'PING'){// 判断修改的监控项类型        
        dispatch({// 获得指定 id 的项目数据
          type: 'todos/getTask',
          id: values.id,
        });
        browserHistory.push('/qsm/update/ping');// 跳转至对应页面
      }else if(values.monitor_type == 'HTTP'){
        dispatch({
          type: 'todos/getTask',
          id: values.id,
        });
        browserHistory.push('/qsm/update/http');
      }else if(values.monitor_type == 'TCP'){
        dispatch({
          type: 'todos/getTask',
          id: values.id,
        });
        browserHistory.push('/qsm/update/tcp');
      }else if(values.monitor_type=='DNS'){
        dispatch({
          type:'todos/getTask',
          id:values.id,
        });
        browserHistory.push('/qsm/update/dns');
      }
    };

    return (
      <div className={styles.main_container}>
        {/*<div className={styles.subheader}>
          <div className={styles.wrapper}>
            <TwoLevelNav defaultSelectedKeys={['1']} />
          </div>
        </div>*/}
        <div className={styles.wrapper}>
          <div className={styles.breadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>
                {/*<Link to='/'>首页</Link>*/}
                <Link to='/dashboard'>首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>网站性能监控</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className={styles.container}>
            <aside className={styles.left_side}>
              {/*<LeftNav defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} projects={projects} />*/}
              <Menu mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys}>
                <SubMenu key="sub1" title={<span><Icon type="laptop" />监控分类</span>}>
                  <Menu.Item key="1"><Link onClick={() => this.handleClick('all')}>全部类型</Link></Menu.Item>
                  <Menu.Item key="2"><Link onClick={() => this.handleClick('PING')}>Ping</Link></Menu.Item>
                  <Menu.Item key="3"><Link onClick={() => this.handleClick('HTTP')}>Http</Link></Menu.Item>
                  <Menu.Item key="4" style={{ display: "none" }}><Link onClick={() => this.handleClick('DNS')}>DNS</Link></Menu.Item>
                  <Menu.Item key="5"><Link onClick={() => this.handleClick('TCP')}>TCP</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="user" />项目分组</span>}>
                  {items}
                </SubMenu>
              </Menu>
            </aside>

            <div className={styles.content}>
              <div style={{ height: 240 }}>
                <Link to="/qsm/create">
                  <Button type="primary" className={styles.create}>创建监控项</Button>
                </Link>
                <div style={{clear: 'both'}}>                
                  <TableList data={dataSource} loading={loading} update_data={update_data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'todos/get',
      payload: 'all'
    });
    this.props.dispatch({
      type: 'todos/getProjects',
    });
  }

  handleClick(value) {
    if(value == 'all'){
      this.props.dispatch({
        type: 'todos/get',
        payload: 'all'
      });
    }else if(value == 'PING'){
      this.props.dispatch({
        type: 'todos/get',
        payload: 'PING'
      });
    }else if(value == 'HTTP'){
      this.props.dispatch({
        type: 'todos/get',
        payload: 'HTTP'
      });
    }else if(value == 'TCP'){
      this.props.dispatch({
        type: 'todos/get',
        payload: 'TCP'
      });
    }else if(value == 'DNS'){
      this.props.dispatch({
        type: 'todos/get',
        payload: 'DNS'
      });
    }else{
      this.props.dispatch({
        type: 'todos/get',
        payload: value.project_id
      });
    }
  }

}

AdminCenter = Form.create({})(AdminCenter);

AdminCenter.propTypes = {};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(AdminCenter);