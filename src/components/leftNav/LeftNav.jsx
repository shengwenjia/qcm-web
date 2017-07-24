import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { Menu,Icon } from 'antd';
import { connect } from 'react-redux';

const SubMenu = Menu.SubMenu;

class LeftNav extends Component{
  constructor(props) {
    super(props);
  }

  handleClick(value){
    this.props.dispatch({
      type: 'todos/putProject',
      payload: value
    });
  }

  render(){
    const { defaultSelectedKeys, defaultOpenKeys, projects } = this.props;

    const items = [];
    for(let value of projects){
      items.push(<Menu.Item key={value.project_id}><Link to="/qsm/projects" onClick={() => this.handleClick(value)}>{value.project_name}</Link></Menu.Item>);
    }

    return (
      <Menu mode="inline" defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys}>
        <SubMenu key="sub1" title={<span><Icon type="laptop" />全部类型</span>}>
          <Menu.Item key="1"><Link to="/qsm">全部类型</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/qsm/ping">Ping</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/qsm/http">Http</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/qsm/dns">DNS</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/qsm/tcp">TCP</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="user" />我的网站分类</span>}>
          {items}
        </SubMenu>
      </Menu>
    );
  }
}

LeftNav.porpTypes = {
  defaultSelectedKeys: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  projects: PropTypes.array
};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(LeftNav);