import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

class TwoLevelNav extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { defaultSelectedKeys, linkToTarget } = this.props;
    return (
      <Menu mode="horizontal"
       defaultSelectedKeys={["2"]}
       // defaultSelectedKeys={defaultSelectedKeys} 
       style={{marginLeft: 124, display: "none"}}
       >
        <Menu.Item key="1">
          <Link to="/qsm">网站性能监控</Link>          
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/qam">应用拓扑监控</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

TwoLevelNav.propTypes = {
  defaultSelectedKeys: PropTypes.array,
};

export default TwoLevelNav;