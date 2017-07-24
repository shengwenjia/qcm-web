import React, { PropTypes } from 'react';

import { Modal , Icon } from 'antd';

import styles from "./GuidePage.less";

class GuidePage extends React.Component{
	constructor(props) {
    	super(props);
    
  	}

  	render(){

  		return(
  			<div className={styles.modal} >
  				<div style={{marginTop:this.props.Top , marginLeft:this.props.Left}} >
  					<div className={styles.modal_content}>
  						<Icon type="rollback" className={styles.kinds_icon} />

  					</div>
  				</div>


  			</div>

  		);
  	}



};

GuidePage.propTypes = {
};

export default GuidePage;