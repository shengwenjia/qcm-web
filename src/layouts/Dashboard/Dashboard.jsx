import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import AlarmStateTable from '../../components/TableList/AlarmStateTable';
import AlarmNewsTable from '../../components/TableList/AlarmNewsTable';
import MonitorResources from '../../components/MonitorResources/MonitorResources';
import AlarmWays from '../../components/AlarmWays/AlarmWays';
import QuicklyCreat from '../../components/QuicklyCreat/QuicklyCreat';
import MonitorNav from '../../components/MonitorNav/MonitorNav';

import styles from './Dashboard.less';
import { Row, Col } from 'antd';

class Dashboard extends Component {
	constructor(props) {
	    super(props);
	}

	render() {
		const {data,todos } = this.props;

		


		return (
			<div className={styles.container}>
				<div >
					<MonitorNav />
				</div>

				<Row style={{ marginTop: "-30px" }} gutter={15}>
					<Col span={18}>
						<div className={styles.tableContent}>
							<div style={{marginBottom:15}}>
								<div className={styles.borders} ><AlarmStateTable  /></div>
							</div>
							<div className={styles.borders} ><AlarmNewsTable /></div>
						</div>

					</Col>
					<Col span={6}>
						<div className={styles.rightContent}>
							<div className={styles.borders}><MonitorResources /></div>
							<div className={styles.AlarmWays} ><AlarmWays /></div>
							<div className={styles.QuicklyCreat}><QuicklyCreat /></div>
						</div>
					</Col>
				</Row>


				

				
				

			</div>
		);
	}
}

Dashboard.propTypes = {
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

export default connect(mapStateToProps)(Dashboard);