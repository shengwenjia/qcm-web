import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Menu, Icon, Dropdown } from 'antd';

import Logo from '../Logo/Logo';// logo组件

import Login from '../Login/Login';//Login组件

import styles from './TopNav.less';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render(){
    const { dispatch, todos } = this.props;



    const twoLevelNav = (
        <Menu mode="horizontal"
           defaultSelectedKeys={["2"]}
           style={{ marginLeft: "-15px" }}
           >
            <Menu.Item key="1">
              <Link to="/qsm">站点性能监控</Link>          
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/qam">应用拓扑监控</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="http://qrd.qiyi.domain/" target="_black">即时链路探测</a>
            </Menu.Item>
        </Menu>
    );

    const getDashData = () => {
        dispatch({
          type:'todos/getStrategyState'
        });
        dispatch({
          type:'todos/getEventNews'
        });
        dispatch({
          type:'todos/getMonitorResources'
        });
    };
    
    return (
        <div className={styles.top_side}>
          <div className={styles.head}>
            <div className={styles.wrapper}>
              {/*logo*/}
              <div className={styles.logo}><Logo /></div>
              <div className={styles.login}><Login /></div>
              {/*一级导航*/}
              <Menu theme="dark" mode="horizontal" className={styles.menu_main} defaultSelectedKeys={['1']}>
                <Menu.Item key="1" >
                  <Link to="/dashboard" onClick={() => getDashData()} >概览</Link>
                </Menu.Item> 

                <Menu.Item key="2">

                  <Dropdown overlay={twoLevelNav}>
                    <a style={{ color: "#fff", fontSize: "14px" }} className="ant-dropdown-link">监控<Icon type="down" /></a>
                  </Dropdown>

                </Menu.Item>

              </Menu>
            </div>         
          </div>

        </div>      
    ); 
  }
  
};

TopMenu.propTypes = {
};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(TopMenu);
// export default TopMenu;