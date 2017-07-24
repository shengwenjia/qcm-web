import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Table, Icon } from 'antd';

class AlarmStateTable extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const {loading } = this.props;
		const { dispatch, todos } = this.props;

		// console.log(todos.getDashBoard.StrategyState);
		const data = todos.getDashBoard.StrategyState;
		const dataSource=[];

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
	    const logdateformat = (timestamp) => {
	      return (new Date(timestamp * 1000)).format("yyyy-MM-dd hh:mm:ss");
	    }

		const columns = [{
			title:'时间',
			dataIndex:'time',
			key:'time',
			render:(text) => logdateformat(text) 
			},{
			title:'监控对象',
			dataIndex:'monitor_obj',
			key:'monitor_obj',
			},{
			title:'告警状态',
			dataIndex:'alarm_state',
			key:'alarm_state',
			render: (text) => {
		        if(text == 0){
		          return (<span style={{color: '#339933',}}>正常</span>);
		        }else if(text > 0){
		          return (<span style={{color: '#CC3333',}}>异常</span>);
		        }
		    }
			},{
			title:'告警级别',
			dataIndex:'alarm_level',
			key:'alarm_level',
			},{
			title:'触发规则',
			dataIndex:'trigger_rule',
			key:'trigger_rule',
		}];

		for(var i=0; i<data.length; i++){
			dataSource[i]={
				key:i,
				time:data[i].update_time,
				monitor_obj:data[i].target,
				alarm_state:data[i].status,
				alarm_level:data[i].alarm_level + '级',
				trigger_rule:data[i].strategy_description,
			}
		}

		

		return (
			<div>
				<h5>实时告警策略状态(Top 10)</h5><br />
				<Table columns={columns} dataSource={dataSource} loading={loading}  bordered />
			</div>
	      
	    );
	}

	




}



AlarmStateTable.propTypes = {
  
  loading: PropTypes.any,
  
};
function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(AlarmStateTable);