import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { Table, Icon } from 'antd';

class AlarmNewsTable extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { loading } = this.props;
		const { dispatch, todos } = this.props; 
		const data = todos.getDashBoard.EventNews;
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
			title:'事件类型',
			dataIndex:'event_type',
			key:'event_type',
		},{
			title:'策略名称',
			dataIndex:'strategy_name',
			key:'strategy_name',
		},{
			title:'摘要',
			dataIndex:'abstruct',
			key:'abstruct',
		}];


		for(var i=0; i<data.length; i++){
			dataSource[i]={
				key:i,
				time:data[i].update_time,
				event_type:data[i].event_type,
				strategy_name:data[i].alarm_name,
				abstruct:data[i].event_summary
				
			}
		}

		return (
			<div>
				<h5>最新告警事件消息(Top 10)</h5><br/>
				<Table columns={columns} dataSource={dataSource} loading={loading} bordered />
			</div>	
	      
	    );

	}

	



}



AlarmNewsTable.propTypes = {
  
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

export default connect(mapStateToProps)(AlarmNewsTable);