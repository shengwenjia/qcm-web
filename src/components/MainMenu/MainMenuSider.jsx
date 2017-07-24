import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon, Switch, Layout } from 'antd';

const { Sider } = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MainMenuSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'vertical',
      navWidth: {width: '55px'},
      subA: '',
      subB: '',
      logo: {display: 'none'},
    } 
  }

  changeMode = (collapsed, type) => {
    this.setState({
      mode: !collapsed ? 'inline' : 'vertical',
      navWidth: !collapsed ? {width: '240px'} : {width: '55px'},
      subA: !collapsed ? '概览' : '',
      subB: !collapsed ? '监控' : '',
      logo: !collapsed ? { color: "#FFF", fontSize: "15px", fontWeight: "bold", marginLeft: "58px", display: 'block', padding: '10px 0' } : { display: 'none' },
    });
  }

  render() {
    return (
      <Sider 
      width={240} 
      style={{height:"500px"}}
      defaultCollapsed={true} 
      collapsible={true} 
      trigger={<Icon type="menu-fold" />} 
      collapsedWidth={55} 
      onCollapse={this.changeMode}>
        {/*<p style={{textAlign: 'center', backgroundColor: '#4A5064'}}>
          <Switch onChange={this.changeMode} checkedChildren={<Icon type="menu-fold" />} unCheckedChildren={<Icon type="menu-unfold" />} />
        </p>*/}
        <span style={this.state.logo}>QIM2.0 | 云监控</span>    
        <Menu
          style={this.state.navWidth}
          mode={this.state.mode} 
          theme='dark'
        >
          <SubMenu key="sub1" title={<span><Icon type="bars" /><span>{this.state.subA}</span></span>}>
            <Menu.Item key="1">概览</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="line-chart" /><span>{this.state.subB}</span></span>}>
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
        </Menu>
      </Sider>
    );
  }
}