import React, { Component } from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu;

class MainMenu extends Component {
    constructor() {
        super();
        this.state = {
            theme: 'dark',
            current: '1',
        }
    }

    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }

    render() {
        return (
          <div style={{width: '100%'}}>
            <p style={{ color: "#FFF", fontSize: "15px", textAlign: 'center', backgroundColor: '#4A5064' }}><Icon id="navToggle" type="menu-fold" onClick={this.navClick.bind(this)} /></p>
            <span style={{ color: "#FFF", fontSize: "15px", fontWeight: "bold", marginLeft: "58px" }}>QIM2.0 | 云监控</span>
            <Menu
              theme={this.state.theme}
              onClick={this.handleClick}
              style={{ width: 240 }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="bars" /><span>概览</span></span>}>
                <Menu.Item key="1">概览</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="line-chart" /><span>监控</span></span>}>
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
              <SubMenu key="sub3" title={<span><Icon type="bars" /><span>意见反馈</span></span>}>
                <Menu.Item key="5">
                  <a href="mailto://zhujiandong@qiyi.com">意见反馈</a>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        );
    }

    navClick() {
      console.log('ok');
    }
}

export default MainMenu;