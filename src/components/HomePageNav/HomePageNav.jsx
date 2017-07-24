import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Logo from '../Logo/Logo';// logo组件

import styles from './HomePageNav.less';

class HomePageNav extends Component {

  constructor(){
    super();
  }

  render(){

    const { todos, dispatch } = this.props;

    const menu = (
      <Menu mode="horizontal" theme="dark" style={{width: '130px'}}>
        <Menu.Item key="qcm" className={styles.drop_menu_item}><span><a href="/qsm" className={styles.menu_a}>站点性能监控</a></span></Menu.Item>
        <Menu.Item key="qrd" className={styles.drop_menu_item}><span><a href="http://qrd.qiyi.domain" target="_blank" className={styles.menu_a}>即时检测</a></span></Menu.Item>
        <Menu.Item key="game-cloud" className={styles.drop_menu_item}><span><a href="javascript:void(0);" className={styles.menu_a}>服务器监控</a></span></Menu.Item>        
        <Menu.Item key="it" className={styles.drop_menu_item}><span><a href="javascript:void(0);" className={styles.menu_a}>监控App</a></span></Menu.Item>
      </Menu>
    );

    const login = () => {
        dispatch({
          type: ''
        });
    }

    return (
      <div className={styles.top_side}>
          <div className={styles.head}>
            <div className={styles.wrapper}>
              {/*logo*/}
              <div className={styles.logo}><Logo /></div>
              {/*一级导航*/}
              <Menu mode="horizontal"
               theme="dark" 
               className={styles.menu_main}
               >
                <SubMenu title={<span>监控产品&nbsp;<Icon type="down" /></span>} className={styles.menu_item}>
                  {menu}
                </SubMenu>
                <Menu.Item key="3" className={styles.menu_item}>
                  <span><a href="http://qrd.qiyi.domain/allIdc.html" target="_blank" className={styles.menu_a}>全国探测网络</a></span>               
                </Menu.Item>
                <Menu.Item key="4" className={styles.menu_item}>
                  <span><a href="javascript:void(0);" target="_blank" className={styles.menu_a}>帮助支持</a></span>               
                </Menu.Item>
                <Menu.Item key="5" className={styles.menu_item}>
                  <span><a href="javascript:void(0);" onClick={login} className={styles.menu_a}>登录</a></span>               
                </Menu.Item>
              </Menu>
            </div>         
          </div>

        </div>
    );
  }
};

HomePageNav.propTypes = {

};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(HomePageNav);