import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Tabs, Breadcrumb } from 'antd';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import NotFound from '../../components/NotFound/NotFound';
import DetailInfomation from './DetailInformation';
import DetailAlarm from './DetailAlarm';
import DetailEvent from './DetailEvent';
import styles from './detailControlCenter.less';
const TabPane = Tabs.TabPane;

class DetailControlCenter extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { data } = this.props.todos.detailInfo;
    {/*if(data.length == 0){ // 如果没有信息，则返回404页面
      return (<NotFound />);
    }*/}

    const callback = (key) => {
      console.log(key);    
    };

    return (
      <div>
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
              <Breadcrumb.Item>监控详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <Tabs onChange={callback} type="card">
              <TabPane tab="监控详情" key="1">
                <DetailInfomation data={data} />
              </TabPane>
              <TabPane tab="告警策略" key="2">
                <DetailAlarm data={data} />
              </TabPane>
              <TabPane tab="报警事件" key="3">
                <DetailEvent  data={data} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

DetailControlCenter.propTypes = {};

function filter(todos){
  return { ...todos };
}
function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(DetailControlCenter);