import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './UpdateProType.less';
import { Form, Input, Col, Menu, Breadcrumb, Button, Radio, Checkbox, Spin, Select, message, notification, Icon, Tag, Modal } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import NotFound from '../../components/NotFound/NotFound';
import EchartsMap from '../../components/EchartsPie/EchartsMap.jsx';

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


class UpdateTcp extends Component{

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      isFirst: true, // 页面状态只更新一次
      tags: [],
      visible: false,
      mapData: [],
      privateNodes: [],
      privateMapData: [],
      publicNodes: [],
      publicMapData: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const change_data = nextProps.todos.getTask.taskdata;// 需要修改的数据
    const idc_checked = [];
    const { checkedList, mapData, privateNodes, privateMapData, publicNodes, publicMapData } = this.state;
    const nodeList = nextProps.todos.idcList.data; // 检测点列表
    const plainOptions = nodeList.both; //通过接口获得检测点全部列表
    const private_nodes = nodeList.private_only; // 内网检测点列表
    const public_nodes = nodeList.public_only; // 外网检测点列表

    if(this.state.isFirst){
      if(typeof(change_data.nodes) != 'undefined'){
        for(let value of change_data.nodes){
          const deal_data = value.name; // 获取以选中idc的name
          idc_checked.push(deal_data);
          //checkedList.push(value.node_id);
          //mapData.push({name: value.province_cn, selected: true});
        }

        for(let value of change_data.nodes){
          for(let both of plainOptions){// 遍历内外网都有的节点 
            if(value.node_id == both.node_id){// 将对应的数据联系起来
              checkedList.push(value.node_id);
              mapData.push({name: value.province_cn, selected: true});
            }
          }
          for(let privateNode of private_nodes){
            if(value.node_id == privateNode.node_id){
              privateNodes.push(value.node_id);
              privateMapData.push({name: value.province_cn, selected: true});
            }
          }
          for(let publicNode of public_nodes){
            if(value.node_id == publicNode.node_id){
              publicNodes.push(value.node_id);
              publicMapData.push({name: value.province_cn, selected: true});
            }
          }
        }
      }      
      this.setState({
        id: change_data.task_id,
        isFirst: false,
        checkedList: checkedList,
        tags: idc_checked,
        mapData,
        privateNodes,
        privateMapData,
        publicNodes,
        publicMapData
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
    }
    if(taskdata.length == 0){ //如果数据不存在，返回找不到该页面
      return (<NotFound />);
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
     * 多选框单选判断 
     */
    const nodeList = todos.idcList.data; // 检测点列表

    const plainOptions = nodeList.both; //通过接口获得检测点全部列表
    const privateNodes = nodeList.private_only; // 内网检测点列表
    const publicNodes = nodeList.public_only; // 外网检测点列表    

    const idc_list_name = [];// 处理idc列表
    const private_nodes = []; // 内网列表
    const public_nodes = []; // 外网列表

    const idc_map = new Map(); // 检测点 ID-VALUE集合
    const idc_province = new Map(); // 检测点地理位置ID-PROVINCE集合
    const name_id = new Map(); // 检测点 NAME-ID集合

    for(let value of plainOptions){
      const name = value.name;
      const id = value.node_id;
      idc_list_name.push({label: name, value: id});
      idc_map.set(id, name);
      idc_province.set(id, value.province_cn);
      name_id.set(name, id);
    }
    for(let value of privateNodes){ // 内网列表
      private_nodes.push({label: value.name, value: value.node_id});

      idc_map.set(value.node_id, value.name);
      idc_province.set(value.node_id, value.province_cn);
      name_id.set(value.name, 'pri' + value.node_id);
    }
    for(let value of publicNodes){ // 外网列表
      public_nodes.push({label: value.name, value: value.node_id});

      idc_map.set(value.node_id, value.name);
      idc_province.set(value.node_id, value.province_cn);
      name_id.set(value.name, 'pub' + value.node_id);
    }
    /**
     * 多选框地图联动
     */
    const onChange = (checkedList) => {
      const mapData = this.state.mapData;
      if(checkedList.length > 0){
        mapData.splice(0, mapData.length); // 重置地图数据
        for(let value of checkedList){
          const select_province = idc_province.get(value);        
          mapData.push({
            name: select_province, selected: true
          });          
        }
        this.setState({
          mapData,
          checkedList
        });
      }else{
        this.setState({
          mapData: [],
          checkedList
        });
      }
    };
    const onChangePublic = (publicNodes) => {      
      const publicMapData = this.state.publicMapData;
      if(publicNodes.length > 0){
        publicMapData.splice(0, publicMapData.length); // 重置地图数据
        for(let value of publicNodes){
          const select_province = idc_province.get(value);        
          publicMapData.push({
            name: select_province, selected: true
          });          
        }
        this.setState({
          publicMapData,
          publicNodes
        });
      }else{
        this.setState({
          publicMapData: [],
          publicNodes
        });
      }
    };
    const onChangePrivate = (privateNodes) => {
      const privateMapData = this.state.privateMapData;
      if(privateNodes.length > 0){
        privateMapData.splice(0, privateMapData.length); // 重置地图数据
        for(let value of privateNodes){
          const select_province = idc_province.get(value);        
          privateMapData.push({
            name: select_province, selected: true
          });          
        }
        this.setState({
          privateMapData,
          privateNodes
        });
      }else{
        this.setState({
          privateMapData: [],
          privateNodes
        });
      }
    };
    /**
     * 模态框确认
     */
    const handleOk = () => {
      const { checkedList, privateNodes, publicNodes, tags } = this.state;
      const nodeListArr = checkedList.concat(privateNodes, publicNodes);
      if(nodeListArr.length > 0){
        tags.splice(0, tags.length); // 重置标签组
        for(let value of nodeListArr){
          const select_name = idc_map.get(value);
          tags.push(select_name);
        }
        this.setState({
          visible: false,
          tags
        });
      }else{
        this.setState({
          visible: false,
          tags: ['请选择检测点']
        });
      }          
    };
    /**
     * 标签关闭函数
     */
    const handleClose = (removeTag) => {
      const tags = this.state.tags.filter(tag => tag !== removeTag);

      const {checkedList, privateNodes, publicNodes} = this.state;
      const {mapData, privateMapData, publicMapData} = this.state;

      if(tags.length == 0){
        checkedList.splice(0, checkedList.length);
        privateNodes.splice(0, privateNodes.length);
        publicNodes.splice(0, publicNodes.length);

        mapData.splice(0, mapData.length);
        privateMapData.splice(0, privateMapData.length);
        publicMapData.splice(0, publicMapData.length);

        this.setState({
          tags: ['请选择检测点'],
          checkedList,
          privateNodes,
          publicNodes,
          mapData,
          privateMapData,
          publicMapData
        });
      }else{
        checkedList.splice(0, checkedList.length);
        privateNodes.splice(0, privateNodes.length);
        publicNodes.splice(0, publicNodes.length);

        mapData.splice(0, mapData.length);
        privateMapData.splice(0, privateMapData.length);
        publicMapData.splice(0, publicMapData.length);

        for(let key of tags){
          const idc_id = name_id.get(key);
          const typeNode = idc_id.substring(0, 3);

          if(typeNode == 'pri'){
            const select_province = idc_province.get(idc_id.substring(3));
            privateNodes.push(idc_id.substring(3));
            privateMapData.push({name: select_province, selected: true});
          }else if(typeNode == 'pub'){
            const select_province = idc_province.get(idc_id.substring(3));
            publicNodes.push(idc_id.substring(3));
            publicMapData.push({name: select_province, selected: true});
          }else{
            const select_province = idc_province.get(idc_id);
            checkedList.push(idc_id);
            mapData.push({name: select_province, selected: true});
          }
        }
        this.setState({
          tags: tags,
          checkedList,
          privateNodes,
          publicNodes,
          mapData,
          privateMapData,
          publicMapData
        });
      }
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
     * 检测端口的合法性
     */
    const checkPort = (rule, value, callback) => {
      const checkPort = new RegExp("[0-9]");
      if(checkPort.test(value)){
        callback();
      }else{
        callback("端口不符合规则");
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
        }else if(this.state.checkedList.length == 0 && this.state.privateNodes.length == 0 && this.state.publicNodes.length == 0){
          message.warning('请至少选择一个检测点');
        }else{
          notification.open({
            message: '修改监控项',
            description: '任务正在修改中......',
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
            type: 'TCP',
            project_id: values.select_type,
            task_name: values.obj_name,
            target: values.ip_address,
            port: parseInt(values.TCP_port),
            period: parseInt(values.monitor_rate * 60),
            nodes: this.state.checkedList.concat(this.state.privateNodes, this.state.publicNodes),
            task_id: task_id
          };
          console.log(post_value);

          dispatch({ // action请求
            type: 'todos/putTask',
            values: post_value,
          });
        }
      });
    };
    /*
     * 创建项通过验证后，改变按钮状态
     */
    const add_loading = todos.putTask.loading;
    /**
     * 多选框选择IDC
     */
    const { tags } = this.state;

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
              <Breadcrumb.Item>修改Tcp</Breadcrumb.Item>
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
                 label='端口' 
                 hasFeedback 
                 extra='请填写TCP端口，如：80' 
                 className={styles.form_item}
                >
                  {getFieldDecorator('TCP_port', {
                    rules: [
                      { required: true, message: '端口不能为空' },
                      { validator: checkPort, }
                    ],
                    initialValue: `${taskdata.parameters.port}`
                  })(
                    <Input type="text" maxLength="5" />
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
                    initialValue: `${taskdata.project.project_id}`
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
                  <div>
                    <div style={{width: '60%', border: '1px solid #D9D9D9', borderRadius: '5px', display: 'inline-block', marginRight: '5px', padding: '0 5px'}}>
                      {tags.map((tag, index) => {
                        const isLong = tag.length > 5;
                        let tagElem;
                        if(tag == '请选择检测点'){
                          tagElem = (
                            <Tag key={tag} style={{color: 'red'}}>{tag}</Tag>
                          );
                        }else{
                          tagElem = (
                            <Tag key={tag} closable={true} afterClose={() => handleClose(tag)}>{isLong ? `${tag.slice(0,5)}...` : tag}</Tag>
                          );
                        }                        
                        return tagElem;
                      })}
                    </div>
                    <Button type="primary" style={{height: '32px', verticalAlign: 'top'}} onClick={this.handleClick.bind(this)}>
                      <Icon type="plus" />
                    </Button>
                  </div>
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
          <Modal title='请选择检测点' visible={this.state.visible} onOk={handleOk} onCancel={this.handleCancel.bind(this)} width='65%'>
            <div style={{height: '500px'}}>
              <div style={{width: '50%', height: '500px', overFlow: 'auto', display: 'inline-block', verticalAlign: 'top'}}>
                <EchartsMap data={this.state.mapData.concat(this.state.publicMapData, this.state.privateMapData)} />
              </div>
              <div style={{width: '50%', display: 'inline-block', verticalAlign: 'top'}}>
                <div style={{ borderBottom: '1px solid #e9e9e9', margin: '10px 0' }}>
                  <h4>内外网节点&nbsp;
                    <span style={{fontSize: '12px', color: '#999'}}>注意：首都在线探测点到国内内网只通80,8080,443端口，如有特殊需求请联系我们</span>
                  </h4>
                </div>
                <CheckboxGroup options={idc_list_name} value={this.state.checkedList} onChange={onChange} />
                {
                  public_nodes.length > 0 ?
                      <div>
                        <div style={{ borderBottom: '1px solid #e9e9e9', margin: '10px 0' }}>
                          <h4>外网节点</h4>
                        </div>
                        <CheckboxGroup options={public_nodes} value={this.state.publicNodes} onChange={onChangePublic} />
                      </div> : ''
                }
                {
                  private_nodes.length > 0 ?
                  <div>
                    <div style={{ borderBottom: '1px solid #e9e9e9', margin: '10px 0' }}>
                      <h4>内网节点</h4>
                    </div>
                    <CheckboxGroup options={private_nodes} value={this.state.privateNodes} onChange={onChangePrivate} />
                  </div> : ''
                }
              </div>
            </div>   
          </Modal>
        </div>
      </div>
    );
  }

  handleClick(){
    this.setState({
      visible: true,
    });
  }

  handleCancel(e){
    this.setState({
      visible: false,
      tags: ['请选择检测点'],
      checkedList: [],
      privateNodes: [],
      publicNodes: [],
      mapData: [],
      privateMapData: [],
      publicMapData: [],
    });
  }
}

UpdateTcp.propTypes = {};

UpdateTcp = Form.create({})(UpdateTcp);

UpdateTcp.propTypes = {};

function filter(todos){
  return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(UpdateTcp);