import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './AlarmCreate.less';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import NotFound from '../../components/NotFound/NotFound';
import UserTable from '../../components/UserTable/UserTable';
import { Form, Input, Col, Menu, Breadcrumb, Button, Radio, Checkbox, Spin, Select, message, notification, Modal, Table, Icon } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class AlarmUpdate extends Component{
  constructor(props) {
    super(props);
    const task_id = props.todos.alarmCreate.id; // 添加报警策略对应项的task_id
    this.state = {
      task_id: task_id,
      value: this.props.value || 0,
      visiable: false,
      counting_operator: '>',
      users: [<label key='none'>无</label>],
      notification_obj_error: { // 默认选中所有的异常通知方式
        alarm_email: true,
        alarm_sms: true,        
      },
      notification_obj_ok: { // 默认选中所有的正常通知方式
        ok_email: true,
        ok_sms: true,
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
    /*
     * 循环渲染原始报警对象列表
     */
    const old_users_list = [];
    const old_users = nextProps.todos.getAlarmStrategy.data.notify_party; // 原始报警对象    
    if(typeof(old_users) != 'undefined' && old_users.length > 0){
      for(var i = 0; i < old_users.length; i++){
        old_users_list.push(<label key={i} style={{marginLeft: '5px', color: '#999'}}>{old_users[i].name}</label>);
      }
      this.setState({
        users: old_users_list,
      });
    }else{
      this.setState({
        users: [<label key='none'>无</label>],
      });
    }   
  }

  render(){
    const { getFieldDecorator } = this.props.form; // 表单数据绑定    
    const { dispatch } = this.props;
    const formItemLayout = { // 表单样式
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    const { loading } = this.props.todos.detailInfo;
    const { data } = this.props.todos.getAlarmStrategy;
    const getLoading = this.props.todos.getAlarmStrategy.loading;
    const metrics = this.props.todos.detailInfo.MetricsChartData;
    if(loading || getLoading){
      return (<Spin />);
    }
    if(data.length == 0){
      return (<NotFound />);
    }
    /*
     * 循环渲染counting_metrics
     */
    const metrics_list = [];
    for(var value of metrics){
      let i = 0;
      metrics_list.push(
        <Option key={i} value={value.metric}>{value.name}</Option>
      );
      i++;
    }
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
     * 改变默认的阀值操作
     */
    const changeOperator = (value) => {
      this.setState({
        counting_operator: value,
      });
    };
    /*
     * 检查阀值是否为整数
     */
    const handleChange = (e) => {
      const number = parseFloat(e.target.value || 0);
      if (isNaN(number)) {
        return;
      }
      if (!('value' in this.props)) {
        this.setState({ value: number });
      }
      // Should provide an event to pass value to Form.
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(number);
      }
    };
    /*
     * 显示模态框
     */
    const edit_contract = () => { // 显示编辑联系人模态框
      this.setState({
        visible: true,
      });
    };
    /*
     * 循环渲染原始报警对象列表
     */
    const old_users_list = [];
    const old_users = data.notify_party; // 原始报警对象    
    for(var i = 0; i < old_users.length; i++){
      old_users_list.push(<label key={i} style={{marginLeft: '5px', color: '#999'}}>{old_users[i].name}</label>);
    }
    /*
     * CheckboxGroup 初始化
     */
    const plainOptions = ['邮件通知','短信通知'];
    /*
     * 默认选中的提示方式
     */
    var initChecked = [];
    if(data.notification[0].alarm_sms == 1 && data.notification[0].alarm_email == 1){
      initChecked = ['短信通知', '邮件通知'];
    }else if(data.notification[0].alarm_email == 1){
      initChecked = ['邮件通知'];
    }else{
      initChecked = ['短信通知'];
    }
    var initOkChecked = [];
    if(data.notification[0].ok_sms == 1 && data.notification[0].ok_email == 1){
      initOkChecked = ['短信通知', '邮件通知'];
    }else if(data.notification[0].ok_email == 1){
      initOkChecked = ['邮件通知'];
    }else{
      initOkChecked = ['短信通知'];
    }
    /*
     * 改变异常时候的通知方式
     */
    const changeErrNotification = (e) => {
      if(e.length == 1){
        for(let value of e){
          if(e == '邮件通知'){
            this.setState({
              notification_obj_error: {
                alarm_email: true,
                alarm_sms: false,
              }
            });
          }else{
            this.setState({
              notification_obj_error: {
                alarm_email: false,
                alarm_sms: true,
              }
            });
          }
        }
      }else if(e.length == 0){
        this.setState({
          notification_obj_error: {
            alarm_email: false,
            alarm_sms: false,
          }
        });
      }else{
        this.setState({
          notification_obj_error: {
            alarm_email: true,
            alarm_sms: true,
          }
        });
      }
    };
    /*
     * 改变正常时候的通知方式
     */
    const changeOkNotification = (e) => {
      if(e.length == 1){
        for(let value of e){
          if(e == '邮件通知'){
            this.setState({
              notification_obj_ok: {
                ok_email: true,
                ok_sms: false,
              }
            });
          }else{
            this.setState({
              notification_obj_ok: {
                ok_email: false,
                ok_sms: true,
              }
            });
          }
        }
      }else if(e.length == 0){
        this.setState({
          notification_obj_ok: {
            ok_email: false,
            ok_sms: false,
          }
        });
      }else{
        this.setState({
          notification_obj_ok: {
            ok_email: true,
            ok_sms: true,
          }
        });
      }
    };

    const handleOk = () => { // 模态框确认回调
      console.log("click ok");
      const user_list = this.props.todos.alarmCreate.data;
      const newUserList = [];
      if(typeof(user_list) != 'undefined' && user_list.length > 0){
        for(var i = 0; i < user_list.length; i++){
          newUserList.push(<label key={i} style={{marginLeft: '5px'}}>{user_list[i].name}</label>);
        }
      }else{
        newUserList.push(<label key='0'>无</label>);
        // for(var i = 0; i < old_users.length; i++){
        //   newUserList.push(<label key={i} style={{marginLeft: '5px'}}>{old_users[i].name}</label>);
        // }
      }

      this.setState({
        visible: false,
        users: newUserList,
      });
    };  
    const handleCancel = () => {
      this.setState({
        visible: false,
      });
    };
    /*
     * 模态框列表数据
     */
    const dataSource = [];
    const users_loading = this.props.todos.getAlarmUser.loading;
    const notify_party = this.props.todos.getAlarmUser.data.notify_parties;
    // for(let value of notify_party){
    //   const deal_data = {
    //     name: value.name,
    //     tel_num: value.mobile,
    //     mail_address: value.email,
    //     notify_party_id: value.notify_party_id,
    //   }
    //   dataSource.push(deal_data);
    // }
    for(var i = 0; i < notify_party.length; i++){
      const deal_data = {
        key: i,
        name: notify_party[i].name,
        tel_num: notify_party[i].mobile,
        mail_address: notify_party[i].email,
        notify_party_id: notify_party[i].notify_party_id,
        username: notify_party[i].username,
      }
      dataSource.push(deal_data);
    }
    /*
     * 表单提交
     */
    const updateLoading = this.props.todos.updataAlarmStrategy.loading;
    const handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {
        if(err){
          return;
        }else{
          let threshold = 0;
          let alarm_obj = [];
          const alarm_user = this.props.todos.alarmCreate.data;
          if(alarm_user && alarm_user.length > 0){
            alarm_obj = alarm_user;
          }else{
            //alarm_obj = old_users; // 如果没有选择，传值原始对象
          }
          if(typeof(values.threshold) != 'undefined'){
            threshold = values.threshold;
          }else{
            threshold = data.counting_threshold;
          }
          const notification = {
            alarm_email: this.state.notification_obj_error.alarm_email,
            alarm_sms: this.state.notification_obj_error.alarm_sms,
            ok_email: this.state.notification_obj_ok.ok_email,
            ok_sms: this.state.notification_obj_ok.ok_sms,
          };
          const post_value = {
            task_id: this.state.task_id,
            alarm_name: values.name,
            counting_metric: values.task,
            counting_period: parseInt(values.period * 60),
            counting_method: values.method,
            counting_operator: this.state.counting_operator,
            counting_threshold: parseInt(threshold),
            evaluation_period: parseInt(values.repeat_times),
            notify_party: alarm_obj, // 告警对象
            notification: notification, // 通知方式
            alarm_strategy_id: data.alarm_strategy_id,
          };

          console.log(post_value);
          dispatch({
            type: 'todos/updateAlarmStrategy',
            payload: post_value,
          });
        }
      });
    };

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
              <Breadcrumb.Item>修改报警策略</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
              <Form horizontal onSubmit={handleSubmit}>
                <label style={{color: '#999'}}>
                  策略信息
                </label>
                <FormItem 
                {...formItemLayout} 
                label='名称' 
                className={styles.form_item} 
                extra='以中英文开头，支持中英文、数字、下划线或连接符，最多50个字符'>
                  {getFieldDecorator('name', {
                    rules: [
                      { required: true, message: '任务名称不能为空' },
                      { validator: check_objName, }
                    ],
                    initialValue: data.alarm_name,
                  })(
                    <Input type="text" maxLength="50" />
                  )}
                </FormItem>
                <FormItem 
                {...formItemLayout} 
                label='监控项' 
                className={styles.form_item}>
                  {getFieldDecorator('task', {
                    rules: [
                      { required: true, message: '监控项不能为空' },
                    ],
                    initialValue: data.counting_metric,
                  })(
                    <Select showSearch={false} style={{width: '300px'}}>
                      {metrics_list}
                    </Select>
                  )}
                </FormItem>
                <FormItem 
                {...formItemLayout} 
                label='统计周期' 
                className={styles.form_item}>
                  {getFieldDecorator('period', {
                    rules: [
                      { required: true, message: '统计周期不能为空' },
                    ],
                    initialValue: ''+ parseInt(data.counting_period / 60) +''
                  })(
                    <Select showSearch={false} style={{width: '150px'}}>
                      <Option value="5">5分钟</Option>
                      <Option value="10">10分钟</Option>
                      <Option value="15">15分钟</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem 
                {...formItemLayout} 
                label='统计方法' 
                className={styles.form_item}>
                  {getFieldDecorator('method', {
                    rules: [
                      { required: true, message: '统计方法不能为空' },
                    ],
                    initialValue: ''+ data.counting_method +''
                  })(
                    <Select showSearch={false} style={{width: '150px'}}>
                      <Option value="avg">平均值</Option>
                      {/*<Option value="sum">总和值</Option>*/}
                      <Option value="max">最大值</Option>
                      <Option value="min">最小值</Option>
                    </Select>
                  )}
                </FormItem>
                {/*<FormItem 
                {...formItemLayout} 
                label='原始阀值' 
                className={styles.form_item}>
                  {getFieldDecorator('old_threshold')(
                    <div>
                      <label style={{marginLeft: '10px', color: '#999'}}>{data.counting_operator}</label>
                      <label style={{marginLeft: '10px', color: '#999'}}>{data.counting_threshold}毫秒</label>
                    </div>
                  )}
                </FormItem>*/}
                <FormItem 
                {...formItemLayout} 
                label='当前阈值' 
                className={styles.form_item}>
                  {getFieldDecorator('threshold')(
                    <div>
                      <Select showSearch={false} style={{width: '100px', float: 'left'}} defaultValue={data.counting_operator} onChange={changeOperator}>
                        <Option value=">">&gt;</Option>
                        <Option value=">=">&gt;=</Option>
                        <Option value="=">=</Option>
                        <Option value="<">&lt;</Option>
                        <Option value="<=">&lt;=</Option>
                        <Option value="!=">!=</Option>
                      </Select>
                      <Input
                        type="text" 
                        defaultValue={data.counting_threshold} 
                        onChange={handleChange} 
                        style={{width: '150px', float: 'left', margin: '0 10px'}}
                      />
                      <span style={{ marginLeft: '10px', color: '#999'}}>仅支持输入整数</span>
                    </div>
                  )}                  
                </FormItem>
                <FormItem 
                {...formItemLayout} 
                label='重复几次后报警' 
                className={styles.form_item}>
                  {getFieldDecorator('repeat_times',{
                    initialValue: ''+ data.evaluation_period +'',
                  })(
                    <Select showSearch={false} style={{width: '100px'}}>
                      <Option value="1">1次</Option>
                      <Option value="3">3次</Option>
                      <Option value="5">5次</Option>
                    </Select>
                  )}                  
                </FormItem>
                <span style={{display: 'block', width: '100%', height: '1px', backgroundColor: '#eee', margin: '20px 0'}} />
                <label style={{color: '#999'}}>
                通知方式
                </label>
                {/*<FormItem
                 {...formItemLayout} 
                 label='原始报警对象'  
                 className={styles.form_item}
                >
                  <div>
                    {old_users_list}
                  </div>                 
                </FormItem>*/}
                <FormItem
                 {...formItemLayout} 
                 label='当前报警对象'  
                 className={styles.form_item}
                >
                  <div>
                    {this.state.users}
                    <a style={{paddingLeft: '10px'}} onClick={edit_contract}>选择联系人</a>
                  </div>                 
                </FormItem>
                <FormItem
                 {...formItemLayout} 
                 label='异常'  
                 className={styles.form_item}
                >
                  {getFieldDecorator('err_notice', {
                    initialValue: initChecked
                  })(
                    <CheckboxGroup options={plainOptions} onChange={changeErrNotification} />
                  )}                  
                </FormItem>
                <FormItem
                 {...formItemLayout} 
                 label='恢复正常'  
                 className={styles.form_item}
                >
                  {getFieldDecorator('normal_notice', {
                    initialValue: initOkChecked,
                  })(
                    <CheckboxGroup options={plainOptions} onChange={changeOkNotification} />
                  )}                  
                </FormItem>
                {/*<FormItem
                 {...formItemLayout} 
                 label='数据不足'  
                 className={styles.form_item}
                >
                  {getFieldDecorator('nodata_notice')(
                    <CheckboxGroup options={plainOptions} />
                  )}                  
                </FormItem>*/}
                <FormItem
                  wrapperCol={{ span: 10, offset: 8 }} 
                  style={{marginTop: '20px'}}
                >
                  <Button type="primary" size="large" htmlType="submit" loading={updateLoading} onClick={this.goBack}>修改</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button type="ghost" size="large" onClick={this.goBack}>返回</Button>
                </FormItem>
              </Form>
              <Modal 
              title="报警联系人选择" 
              visible={this.state.visible} 
              onOk={handleOk} 
              onCancel={handleCancel} 
              wrapClassName = {styles.vertical_center_modal} 
              width='50%'
              >
                <UserTable data={dataSource} loading={users_loading} disabled='' />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {    
    const { data } = this.props.todos.getAlarmStrategy;
    this.props.dispatch({ // 清空alarmCreate的store
      type: 'todos/alarmCreate',
      payload: [],
    });
    this.props.dispatch({ // 清空alarmCreate的store
      type: 'transmitId',
      payload: '',
    });
    this.props.dispatch({
      type: 'todos/alarmCreate',
      payload: data.notify_party
    });
  }

  goBack(){
    window.history.go(-1);
  }
}

AlarmUpdate.propTypes = {};
AlarmUpdate = Form.create({})(AlarmUpdate);

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(AlarmUpdate);
