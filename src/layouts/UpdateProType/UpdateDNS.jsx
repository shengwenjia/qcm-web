import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Form, Input, Col, Menu, Breadcrumb, Button, Radio, Checkbox, Spin, message, Select, notification } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import NotFound from '../../components/NotFound/NotFound';
import styles from './UpdateProType.less';

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

const username = Cookie.getCookie("username") ? Cookie.getCookie("username") : "";


// 默认不选中任何idc

class UpdateDNS extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      isFirst:true
    }  
  }
  componentWillReceiveProps(nextProps) {
    const change_data=nextProps.todos.getTask.taskdata;
    const idc_checked = [];
    if(this.state.isFirst){
      if(typeof(change_data.nodes) != 'undefined'){
        for(var value of change_data.nodes){
          const deal_data = value.name; // 获取以选中idc的name
          idc_checked.push(deal_data);
        }  
      }      
      this.setState({
        id: change_data.task_id,
        isFirst: false,
        checkedList: idc_checked,
      });
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    const { todos, dispatch } = this.props;
    const { taskdata, loading } = todos.getTask;
    /* 
     * 得到需要修改的数据 
     */
    if(loading){
      return (<Spin />);
    }else{
      if(taskdata.length === 0){ //如果数据不存在，返回找不到该页面
        return (<NotFound />)
      }
    }
    /*
     *循环输出选择框
     */
    const items = [];
    const select_option = todos.getProjects.data;
    for(let value of select_option){
      items.push(<Option key={value.project_id} value={value.project_id.toString()}>{value.project_name}</Option>);
    }
    /*
     * 多选框单选全选判断
     */
    const plainOptions = todos.idcList.data; // 通过接口获得idc列表
    const idc_list_name = [];// 处理idc列表
    const idc_map = new Map();// 将idc的name与node_id对应起来
    for(let value of plainOptions){
      const name = value.name;
      const id = value.node_id;
      idc_list_name.push(name);
      idc_map.set(name, id);
    }
    const onChange = (checkedList) => {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < idc_list_name.length),
        checkAll: checkedList.length === idc_list_name.length,
      });
    };
    const onCheckAllChange = (e) => {
        this.setState({
        checkedList: e.target.checked ? idc_list_name : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };
    /*
     * 检测项目名称合法性
     */
    const check_objName = (rule, value, callback) => {
      const checkRule = new RegExp("^[a-zA-Z\u4e00-\u9Fa5]+[0-9a-zA-Z-_\u4e00-\u9Fa5]+$");

      if(checkRule.test(value)){
        callback();
      }else{
        callback("任务名称不符合规则");
      }
    };
    /*
     * 检测ip地址的合法性
     */
    const checkIp = (rule, value, callback) => {
      const checkIp = new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9\.]+[a-zA-Z0-9]$");
      if(checkIp.test(value)){
        callback();
      }else{
        callback("域名不符合规则");
      }
    };
    /*
     * 检测所属项目是否为空
     */
    const checkPro = (rule, value, callback) => {
      callback();
    };
    /* 
     * 表单提交方法
     */
    const handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {
        if(err){
          return;
        }else if(this.state.checkedList.length == 0){
          message.warning('请至少选择一个检测点');
        }else{
          notification.open({
            message: '创建监控项',
            description: '任务正在创建中......',
            duration: 2
          });

          const checked_array = this.state.checkedList;
          const node_id = [];
          for(let key of checked_array){
            const value = idc_map.get(key);
            node_id.push(value);
          }
          const task_id = this.state.id;
          const post_value = { // 修改时传递的数据格式
            type: 'DNS',
            project_id: values.select_type,
            task_name: values.obj_name,
            target: values.ip_address,
            period: parseInt(values.monitor_rate * 60),
            nodes: node_id,
            task_id: task_id
          };
          console.log(post_value);

          dispatch({
            type: 'todos/putTask',
            values: post_value,
          });
        }
      });
    };
    /*
     * 创建项通过验证后，改变按钮状态
     */
    let add_loading = todos.putTask.loading;

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
              <Breadcrumb.Item>修改DNS</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
              <Form horizontal onSubmit={handleSubmit}>
                <label style={{color: '#999'}}>
                  基本信息
                </label>
                <FormItem
                 {...formItemLayout} 
                 label='任务名称' 
                 hasFeedback  
                 extra='以中英文开头，支持中英文、数字、下划线或连接符，最多50个字符' 
                 className={styles.form_item}
                >
                  {getFieldDecorator('obj_name', {
                    rules: [
                      { required: true, message: '任务名称不能为空' },
                      { validator: check_objName, }
                    ],
                    initialValue: `${taskdata.task_name}`
                  })(
                    <Input type="text" maxLength="50" />
                  )}
                </FormItem>
                <FormItem
                 {...formItemLayout} 
                 label='域名/IP' 
                 hasFeedback 
                 extra='如：mysite.com，或202.108.22.5' 
                 className={styles.form_item}
                >
                  {getFieldDecorator('ip_address', {
                    rules: [
                      { required: true, message: '域名不能为空' },
                      { validator: checkIp, }
                    ],
                    initialValue: `${taskdata.target}`
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                 {...formItemLayout} 
                 label='所属项目' 
                 hasFeedback 
                 className={styles.form_item}
                >
                  {getFieldDecorator('select_type', {
                    rules: [
                      { required: true, message: '所属项目不能为空' },
                      { validator: checkPro, }
                    ],
                    initialValue: `${taskdata.project.project_name}`
                  })(
                    <Select showSearch={false}>
                      {items}
                    </Select>
                  )}                  
                </FormItem>
                <span style={{display: 'block', width: '100%', height: '1px', backgroundColor: '#eee', margin: '20px 0'}} />
                <label style={{color: '#999'}}>
                采集信息
                </label>
                <FormItem
                 {...formItemLayout} 
                 label='监控频率'  
                 className={styles.form_item}
                >
                  {getFieldDecorator('monitor_rate', {
                    initialValue: `${parseInt(taskdata.period / 60)}`
                  })(
                    <RadioGroup>
                      <RadioButton value="5">5分钟</RadioButton>
                      <RadioButton value="10">10分钟</RadioButton>
                      <RadioButton value="15">15分钟</RadioButton>
                    </RadioGroup>
                  )}                  
                </FormItem>
                <FormItem
                 {...formItemLayout} 
                 label='监测点' 
                 className={styles.form_item} 
                 required
                >
                  {getFieldDecorator('monitor_idc')(
                    <div>
                      <div style={{ borderBottom: '1px solid #e9e9e9' }}>
                        <Checkbox
                         indeterminate={this.state.indeterminate} 
                         onChange={onCheckAllChange} 
                         checked={this.state.checkAll}
                        >
                          全选
                        </Checkbox>
                      </div>
                      <CheckboxGroup options={idc_list_name} value={this.state.checkedList} onChange={onChange} />
                    </div>
                  )} 
                </FormItem>
                <FormItem
                  wrapperCol={{ span: 12, offset: 6 }}
                >
                  <Button type="primary" loading={add_loading} size="large" htmlType="submit">修改</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Link to="/qsm"><Button type="ghost" size="large">返回</Button></Link>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateDNS.propTypes = {};
UpdateDNS = Form.create({})(UpdateDNS);

UpdateDNS.propTypes = {};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(UpdateDNS);


