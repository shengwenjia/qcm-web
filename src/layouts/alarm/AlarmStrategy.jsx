import React, { Component, PropTypes } from 'react';
import { Tabs, Breadcrumb,Spin } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './AlarmStrategy.less';
import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import NotFound from '../../components/NotFound/NotFound';

class AlarmStrategy extends Component {
  constructor(props) {
    super(props);
  }

  render(){
  const { alarmdata }=this.props.todos.getAlarmStrategy;
  const { data,loading} = this.props.todos.getAlarmStrategy;
  if(loading){
    return <Spin/>
  }
  if(data.length==0){
    return <NotFound />
  }
  const items=[];
  if(alarmdata.strategy_status=="0"){
    items.push(<span style={{color:'#339933'}} key='1'>正常</span>);
  }else{
    items.push(<span style={{color:'#CC3333'}} key='2'>异常</span>);
  }
  const enable=[];
  if(alarmdata.shield_alarm=="0"){
    enable.push(<span style={{color:'#339933'}} key='3'>未屏蔽</span>);
  }else{
    enable.push(<span style={{color:'#CC3333'}} key='4'>已屏蔽</span>);
  }
  let methodname='';
  if(data.counting_method=='avg'){
      methodname='平均值';
  }else if(data.counting_method=='sum'){
     methodname='总和值';
  }else if(data.counting_method=='max'){
     methodname='最大值';
  }else if(data.counting_method=='min'){
     methodname='最小值';
  }
  let notify_name='';
  for ( var value of data.notify_party){
      notify_name+=value.name;
      notify_name+="  ";
  }
  let alarm_email='';
  if(data.notification[0].alarm_email==1){
    alarm_email="邮件通知";
  }
  let alarm_sms='';
  if(data.notification[0].alarm_sms==1){
    alarm_sms="短信通知";
  }
  let ok_email='';
  if(data.notification[0].ok_email==1){
    ok_email="邮件通知";
  }
  let ok_sms='';
  if(data.notification[0].ok_sms==1){
    ok_sms="短信通知";
  }
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
                  <Breadcrumb.Item>策略详情</Breadcrumb.Item>
                </Breadcrumb>
          </div>
        <div className={styles.main_content}>
          <div className={styles.label_title}>
            <label>策略信息</label>
          </div>
          <div className={styles.lable_p}>
              <p>
                <label>策略名称：</label>
                <span>{data.alarm_name}</span>
              </p>
              <p>
                <label>策略状态：</label>
               {items}
              </p>
               <p>
                <label>屏蔽状态：</label>
                {enable}
              </p>
               <p>
                <label>统计周期：</label>
                <span>{parseInt(data.counting_period)/60+'分钟'}</span>
              </p>
              <p>
                <label>统计方法：</label>
                <span>{methodname}</span>
              </p>
              <p>
                <label>监控项：</label>
                <span>{data.counting_metric}</span>
              </p>
              <p>
                <label>计算方法：</label>
                <span>{data.counting_operator}</span>
              </p>
              <p>
                <label>阀值：</label>
                <span>{data.counting_threshold+'毫秒'}</span>
              </p>
              <p>
                <label>重复几次后报警：</label>
                <span>{data.evaluation_period+'次'}</span>
              </p>
             
          </div>
          <div className={styles.label_title}>
            <label>通知方式</label>
          </div>
          <div className={styles.lable_p}>
              <p>
                <label>报警对象：</label>
                <span>{notify_name}</span>
              </p>
              <p>
                <label>异常：</label>
                <span>{alarm_email+'  '}{alarm_sms}</span>
              </p>
              <p>
                <label>恢复正常：</label>
                <span>{ok_email+'  '}{ok_sms}</span>
              </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

  componentDidMount() {
   /* this.props.dispatch({
        type: 'put/alarmStrategy',
        payload:[],
      });*/
  }
}

AlarmStrategy.propTypes = {
  data: PropTypes.any,
};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default  connect(mapStateToProps)(AlarmStrategy);