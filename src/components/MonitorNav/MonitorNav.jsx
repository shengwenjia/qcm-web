import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory,Link } from 'react-router';
import { Icon } from 'antd';

import styles from './MonitorNav.less' ;

class MonitorNav extends Component{
	constructor(props){
		super(props);
	}

	render(){
		const {data, loading } = this.props;

		return(
			<div>
				<div className={styles.monitorItem}>
					<div className={styles.number}>0</div>

					<Icon type="solution" className={styles.monitorIcon}/>
					<div className={styles.monitorName}>
						<h3>网站监控</h3>
					</div>
				</div>

				<div className={styles.monitorItem, styles.showNone} >
					<div className={styles.monitorTitle}>
						<h3>没有项目</h3>
						<Link to="">快速创建</Link>
					</div>
					<Icon type="book"  className={styles.monitorIcon } />
					<div className={styles.monitorName} style={{backgroundColor:'#f0ad4e'}}>
						<h3>服务器监控</h3>
					</div>
				</div>
				<div className={styles.monitorItem, styles.showNone}>
					<div className={styles.monitorTitle}>
						<h3>没有项目</h3>
						<Link to="">快速创建</Link>
					</div>
					
					<Icon type="desktop" className={styles.monitorIcon}/>
					<div className={styles.monitorName} style={{backgroundColor:'#31b0d5'}}>
						<h3>服务监控</h3>
					</div>
				</div>
				<div className={styles.monitorItem, styles.showNone}>
					<div className={styles.monitorTitle}>
						<h3>没有项目</h3>
						<Link to="">快速创建</Link>
					</div>
					
					<Icon type="mobile" className={styles.monitorIcon}/>
					<div className={styles.monitorName} style={{backgroundColor:'#449d44'}}>
						<h3>API监控</h3>
					</div>
				</div>
			</div>
		);
	}
}

MonitorNav.propTypes = {
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

export default connect(mapStateToProps)(MonitorNav);