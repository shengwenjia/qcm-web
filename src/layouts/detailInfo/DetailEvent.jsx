import React, { Component, PropTypes } from 'react';
import { Select, DatePicker, Table, Button} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './detailControlCenter.less';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;


class DetailEvent extends Component{
	 constructor(props) {
		    super(props);
			this.state={
				task_id: props.data.id,
			};
		  }
	componentDidMount() {
		if(typeof(this.state.task_id)!='undefined'){
			this.props.dispatch({
				type:'todos/getAlarmEvent',
				task_id:this.state.task_id,
			});
		}else{
			console.log("没有对应的项目ID");
		}
	}
	
	serch(){
		const { todos, dispatch } = this.props;
		const task_id=this.state.task_id;
		const event_type=this.state.event_type;
		const time_arr=[];
		if(typeof(this.state.dateString) != 'undefined'){			
			for(var value of this.state.date){
				const deal_time = Math.round(Date.parse(value) / 1000);
        		time_arr.push(deal_time);
			}			
		}	
		dispatch({
			type:'todos/getAlarmEvent',
			task_id:task_id,
			event_type:event_type,
			start:time_arr[0],
			end:time_arr[1],
		});	
	}

	render(){
		 	const {todos, dispatch}=this.props;
		 	const {data , eventdata}=todos.detailInfo;
		 	const dataSource=[];
		 	for(let value of eventdata){
		 	const tabledata={
		 		event_time:new Date(value.update_time * 1000).toLocaleString('chinese', {
					hour12: false}),
		 		event_type:value.event_type,
		 		event_name:value.alarm_strategy_name,
		 		event_summary:value.event_summary
		 	}
		 	dataSource.push(tabledata);
		 }
		Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,
            // month
            "d+": this.getDate(),
            // day
            "h+": this.getHours(),
            // hour
            "m+": this.getMinutes(),
            // minute
            "s+": this.getSeconds(),
            // second
            "q+": Math.floor((this.getMonth() + 3) / 3),
            // quarter
            "S": this.getMilliseconds()
            // millisecond
        };
        if (/(y+)/.test(format) || /(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    	 const dateFormat = 'YYYY/MM/DD HH:mm:ss';
		 const default_end=new Date().format("yyyy/MM/dd hh:mm:ss");
		 const default_start=new Date((new Date().getTime()-3600*24*1000)).toLocaleString('chinese', {
					hour12: false});
			const columns = [{ // 配置表格
		      title: '时间',
		      dataIndex: 'event_time',
		      key: 'event_time',
		      className:'text_center',
		      width:'150px',
		    },{
		      title: '事件类型',
		      dataIndex: 'event_type',
		      key: 'event_type',
		      className:'text_center',
		      render:(text)=>{
		      	if(text=='Action'){
		      		return "通知消息"
		      	}else{
		      		return '告警消息'
		      	}
		      },
		      width:'150px',
		    },{
		      title: '策略名称',
		      dataIndex: 'event_name',
		      key: 'event_name',
		      className:'text_center',
		      width:'250px',
		     
		    },{
		      title: '摘要',
		      dataIndex: 'event_summary',
		      key: 'event_summary',
		      className:'text_center',
		    }];    
		return(
			<div className={styles.alarm_container}>
				<div className={styles.search_input}>
					<lable style={{ fontSize: "12px" }}>事件类型：</lable>
				    <Select size="large" style={{ width: 200 }} onChange={this.handlechangetype.bind(this)} defaultValue={'所有'}>
				      <Option value="0">所有</Option>
				      <Option value="1">告警事件</Option>
				      <Option value="2">通知事件</Option>
				    </Select>
			    </div>
			    <div className={styles.search_input}>
			    	<lable style={{ fontSize: "12px" }}>时间段：</lable>
			    	<RangePicker 
			            format="YYYY/MM/DD HH:mm:ss" 
			            disabledDate={this.disabledDate}
			            placeholder={['开始时间', '结束时间']} 
			            showTime
			            size='large'
			            defaultValue={[moment(default_start, dateFormat), moment(default_end, dateFormat)]}
			            onChange={this.timerChange.bind(this)}  
			             />

			    </div>
			    <div className={styles.search_input}>
                 	<Button onClick={this.serch.bind(this)}>查询</Button>
                </div>  
			    <div style={{clear:'both',paddingTop:'30px'}}>
			    	<Table 
	                  columns={columns}
	                  dataSource={dataSource} 
	                  bordered 
	                   />
			    </div>
			</div>

			);
	}

	disabledDate(current) {
    		// 今日之后的日期禁止选择
   		return current && current.valueOf() > Date.now();
  	}
  	timerChange(date, dateString){
    // console.log('date', date);
    // console.log('dateString', dateString);
    this.setState({
      dateString: dateString,
      date: date,
    });
    }

	handlechangetype(value){
		if(value=='2'){
			this.setState({
				event_type:'Action'
			});
		}else if(value=='1'){
			this.setState({
				event_type:'StatusUpdate'
			});
		}else{
			this.setState({
				event_type:''
			});
		}
	}
}
DetailEvent.propTypes = {
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

export default connect(mapStateToProps)(DetailEvent);