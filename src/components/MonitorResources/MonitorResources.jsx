import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Progress } from 'antd';


class MonitorResources extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { loading } = this.props;
		const { dispatch, todos } = this.props; 

		const data = todos.getDashBoard.MonitorResources;
		let total=0;
		for(let i=0; i<data.length; i++){
			total+=data[i].count;
		}

		let dataSource =data.map(function(item,index){
			let monitorName=item.type;
			let monitorCount=item.count;
			return (<div key={index}><span style={{ fontSize: "12px" }}>{monitorName}</span><Progress percent={ monitorCount*100/50 } format={percent => `${percent*50/100}/${50}` } /></div> );
		})


		return (
	     <div >
	     		<h5>监控资源</h5>
				<div style={{ width:250 }}>

					{dataSource}
				</div>
	     </div>
	    );
	}

	




}



MonitorResources.propTypes = {
 
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

export default connect(mapStateToProps)(MonitorResources);