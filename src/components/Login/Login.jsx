import React, { PropTypes } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

import styles from './Login.less';

var Cookie=new Object();
Cookie.setCookie=function(name, value, option){
    var str=name+'='+escape(value);
    if(option){
        if(option.expireHours){
            var d=new Date();
            d.setTime(d.getTime()+option.expireHours*3600*1000);
            str+='; expires='+d.toGMTString();
        }
        if(option.path) str+='; path=/';
        if(option.domain) str+='; domain='+option.domain;
        if(option.secure) str+='; true';
    }
    document.cookie=str;
}
Cookie.getCookie=function(name){
    var arr = document.cookie.split('; ');
    if(arr.length==0) return '';
    for(var i=0; i <arr.length; i++){
        var tmp = arr[i].split('=');
        if(tmp[0]==name) return unescape(tmp[1]);
    }
    return '';
}
Cookie.delCookie=function(name){
    this.setCookie(name,'',{expireHours:-1});
}

function logout() {
  Cookie.delCookie("username");
  Cookie.delCookie("token");
  window.location.href="/";
}

const username = Cookie.getCookie("username") ? Cookie.getCookie("username") : "未登录";

const menu = (
  <Menu style={{right:'20px'}}>
    <Menu.Item key="0" style={{ display: "none" }}>
      <a href="#"><Icon type="setting" />&nbsp;设置</a>
    </Menu.Item>
    <Menu.Item key="1" style={{ display: "none" }}>
      <a href="#"><Icon type="user" />&nbsp;个人资料</a>
    </Menu.Item>
    <Menu.Item key="4">
      <a href="http://cloud.qiyi.domain/p/project/list" target="_blank"><Icon type="team" />&nbsp;项目管理</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3"><a onClick={logout}><Icon type="poweroff" />&nbsp;退出</a></Menu.Item>
  </Menu>
);
const Login = () => {
  return (
    <div>   
      <Dropdown overlay={menu} trigger={['click']}>
      <a className={styles.loginText} href="#">
        {username}<Icon type="down" />
      </a>
      </Dropdown>
    </div>
  );
};

export default Login;