import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import { Icon } from 'antd';
import styles from './QuicklyCreat.less';

class QuicklyCreat extends  Component {
	constructor(props){
		super(props);
	}

	render(){
		const {data, loading } = this.props;
		return(
			<div>
				<h5>快速创建</h5>
				<div>
					<Link className={styles.monitorIconLeft} to="/qsm/create/http"><Icon type="cloud-o" /><span className={styles.monitorName}>HTTP</span></Link>
					<Link className={styles.monitorIconPing} to="/qsm/create/ping"><Icon type="book" /><span className={styles.monitorName}>Ping</span></Link>
				</div>
				
				<div>
					<Link className={styles.monitorIconLeft} to="/qsm/create/tcp"><Icon type="bars" /><span className={styles.monitorName}>TCP</span></Link>
					
				</div>
				
				
			</div>

		);

	}
}

QuicklyCreat.propTypes = {
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

export default connect(mapStateToProps)(QuicklyCreat);