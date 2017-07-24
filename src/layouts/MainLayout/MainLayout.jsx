import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import styles from './MainLayout.less';

import TopNav from '../../components/TopNav/TopNav';// 顶部导航组件
import MainMenu from '../../components/MainMenu/MainMenu';// 左侧菜单组件
import MainMenuSider from '../../components/MainMenu/MainMenuSider';

class MainLayout extends React.Component {
  state = {
    collapsed: true,
    mode: 'vertical',
    logo: {display: 'none'},
    openKeys: ['sub1'],
    _style: { marginLeft: "-10px" }
  };
  toggle = () => {
    const coll = this.state.collapsed;
    this.setState({
      collapsed: !coll,
      mode: coll ? 'inline' : 'vertical',
      logo: coll ? { color: "#FFF", fontSize: "15px", fontWeight: "bold", display: 'block', padding: '10px 0' } : { display: 'none' },
      _style: coll ? { marginLeft: "0px" } : { marginLeft: "-10px" }
    });
  }
  render(){
    return (
      <Layout className={styles.bottom_side}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse} 
          width={220} 
          collapsedWidth={30} 
          trigger={null} 
          style={{height: '100%'}}
        >
          {/*<p style={{textAlign: 'right', color: '#fff', margin: '0', backgroundColor: '#4A5064'}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
              onClick={this.toggle}
            />
          </p>*/}
          <div className={styles.nav_button}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'double-right' : 'double-left'} 
              onClick={this.toggle}
            />
          </div>
          <p style={{textAlign: 'center', margin: '0'}}>
            <span style={this.state.logo}>QIM2.0 | 云监控</span>            
          </p>
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['1']} style={{height:'100%'}}>   
            {/*<SubMenu key="sub1" title={<span><Icon type="bars" /><span className="nav-text">概览</span></span>}>    
              <Menu.Item key="1">
                <Link to='/dashboard'>概览</Link>
              </Menu.Item>
            </SubMenu>*/}
            <Menu.Item key="1">
                <Link to='/dashboard'>
                  <Icon style={this.state._style} type="bars" />
                  <span className="nav-text" style={{ color: "rgba(255, 255, 255, 0.67)" }}>概览</span>
                </Link>
            </Menu.Item>
            <SubMenu key="sub2" title={<span><Icon type="line-chart" /><span className="nav-text">监控</span></span>}>
              <Menu.Item key="2">
                  <Link to='/qsm'>站点性能监控</Link>
              </Menu.Item>
              <Menu.Item key="3">
                  <Link to='/qam'>应用拓扑监控</Link>
              </Menu.Item>
              <Menu.Item key="4">
                  <a href="http://qrd.qiyi.domain/" target='_blank'>即时链路探测</a>
              </Menu.Item>
            </SubMenu>
            {/*<SubMenu key="sub3" title={<span><Icon type="mail" /><span className="nav-text">意见反馈</span></span>}>
                <Menu.Item key="5">
                  <Link to='/feedback'>意见反馈</Link>
                </Menu.Item>
            </SubMenu>*/}
            <Menu.Item key="5">
                <Link to='/feedback'>
                  <Icon style={this.state._style} type="mail" />
                  <span className="nav-text" style={{ color: "rgba(255, 255, 255, 0.67)" }}>意见反馈</span>
                </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{marginTop: '20px'}}>
          {this.props.children}
        </Layout>
      </Layout>      
    );
  }  
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
