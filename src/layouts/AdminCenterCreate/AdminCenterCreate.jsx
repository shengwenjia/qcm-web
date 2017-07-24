import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Menu, Breadcrumb, Icon, Button, Table } from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './AdminCenterCreate.less';

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';

class AdminCenterCreate extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    const { dispatch, todos } = this.props;

    const handleClick = (e) => {
      const path = '/qsm/create/'+e.key;
      console.log(e.key);
      browserHistory.push(path);
    }

    const columns = [{
      title: '类型',
      dataIndex: 'type',
      className: styles.type,
      key: 'type'
    },{
      title: '描述',
      dataIndex: 'describe',
      className: styles.describe,
      key: 'describe'
    },{
      title: '操作',
      key: 'action',
      className: styles.action,
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={()=>handleClick(record)} style={{margin:'0 5px 5px 0'}}><Icon type="plus" />创建项目</Button>
          {/*<Button type="default" style={{margin:'0 5px 5px 0'}}><Icon type="copy" />批量操作</Button>
          <Button type="default" style={{margin:'0 5px 5px 0'}}><Icon type="credit-card" />API操作</Button>*/}
        </span>
      )
    }];

    const data =[{
      id: '1',
      type: 'PING',
      key: 'ping',
      describe: '对指定的服务器进行Ping检测，获得可用率报告以及响应时间、丢包率等。'
    },{
      id: '2',
      type: 'HTTP/HTTPs',
      key: 'http',
      describe: '监控web站点中任何指定的URL，获得可用率报告以及响应时间详细分析。'
    },
    // {
    //   id: '3',
    //   type: 'DNS',
    //   key: 'dns',
    //   describe: '监控DNS服务器的可用时间，并获得各种DNS记录列表，支持DNS轮询。'
    // },
    {
      id: '4',
      type: 'TCP',
      key: 'tcp',
      describe: '监控服务器TCP端口的可用率和响应时间。'
    }
    ];

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
                <Link to='/qsm'>网站性能监控</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>创建监控项</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <aside className={styles.left_side}>
              <Menu mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Icon type="desktop" />网站监控</Menu.Item>
              </Menu>
            </aside>
            <div className={styles.content}>
              <div style={{ height: 'auto' }}>
                <div style={{clear: 'both'}}>                
                  <Table columns={columns} dataSource={data} pagination={false} rowKey={record => record.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminCenterCreate.propTypes = {

};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(AdminCenterCreate);