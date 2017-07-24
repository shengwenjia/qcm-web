import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Icon } from 'antd';

class AlarmWays extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const {data, loading } = this.props;
		return(
			<div >
				<h3>默认告警方式</h3>
				<div >
					<Icon type="mail" /> <span>邮件</span> <span>暂无</span> <Link to=""><span>【设置】</span></Link>
				</div>
				<div >
					<Icon type="mobile" /> <span>手机</span> <span>18602162112</span> <Link to=""><span>【设置】</span></Link>
				</div>
				
			</div>
			
		);



	}
}


AlarmWays.propTypes = {
  data: PropTypes.any,
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

export default connect(mapStateToProps)(AlarmWays);