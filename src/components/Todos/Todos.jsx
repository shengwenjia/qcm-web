import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import styles from './Todos.less';

import NotFound from '../NotFound/NotFound';
import AdminCenter from '../../layouts/AdminCenter/AdminCenter';
import AdminCenterCreate from '../../layouts/AdminCenterCreate/AdminCenterCreate';
import Ping from '../../layouts/CreateProType/Ping';
import Http from '../../layouts/CreateProType/Http';
import TCP from '../../layouts/CreateProType/TCP';
import DNS from '../../layouts/CreateProType/DNS';
import UpdatePing from '../../layouts/UpdateProType/UpdatePing';
import UpdateHttp from '../../layouts/UpdateProType/UpdateHttp';
import UpdateTcp from '../../layouts/UpdateProType/UpdateTcp';
import UpdateDNS from '../../layouts/UpdateProType/UpdateDNS';
import AlarmCreate from '../../layouts/alarm/AlarmCreate';
import DetailControlCenter from '../../layouts/detailInfo/detailControlCenter';
import AlarmStrategy from '../../layouts/alarm/AlarmStrategy';
import AlarmUpdate from '../../layouts/alarm/AlarmUpdate';
import Feedback from '../../layouts/Feedback/Feedback';

import QamIndex from '../../layouts/QamIndex/QamIndex';
import PdmIndex from '../../layouts/PdmIndex/PdmIndex';
import NetLink from '../../layouts/MonitorDetails/NetLink';
import BaseServer from '../../layouts/MonitorDetails/BaseServer';
import IdcLink from '../../layouts/MonitorDetails/IdcLink';
import NetLinkDetails from '../../layouts/MonitorDetails/NetLinkDetails';
import IdcLinkDetails from '../../layouts/MonitorDetails/IdcLinkDetails';
import BaseServerQuota from '../../layouts/MonitorDetails/BaseServerQuota';
import BaseServerDetails from '../../layouts/MonitorDetails/BaseServerDetails';
import BaseServerQuotaDetails from '../../layouts/MonitorDetails/BaseServerQuotaDetails';
import Dashboard from '../../layouts/Dashboard/Dashboard';

class Todos extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { location } = this.props;

    if(location.pathname === '/qsm'){
      return (<AdminCenter />);
    }else if(location.pathname === '/qsm/create'){
      return (<AdminCenterCreate />);
    }else if(location.pathname === '/qsm/create/ping'){
      return (<Ping />);
    }else if(location.pathname === '/qsm/create/http'){
      return (<Http />);
    }else if(location.pathname === '/qsm/create/tcp'){
      return (<TCP />);
    }else if(location.pathname === '/qsm/create/dns'){
      return (<DNS />);
    }else if(location.pathname === '/qsm/update/ping'){
      return (<UpdatePing />);
    }else if(location.pathname === '/qsm/update/http'){
      return (<UpdateHttp />);
    }else if(location.pathname === '/qsm/update/tcp'){
      return (<UpdateTcp />);
    }else if(location.pathname === '/qsm/update/dns'){
      return (<UpdateDNS />);
    }else if(location.pathname === '/qsm/alarm/create'){
      return (<AlarmCreate />);
    }else if(location.pathname === '/qsm/detail'){
      return (<DetailControlCenter />);
    }else if(location.pathname=='/qsm/alarm/info'){
      return (<AlarmStrategy />);
    }else if(location.pathname === '/qsm/alarm/update'){
      return (<AlarmUpdate />);
    }else if(location.pathname === '/qam'){
      return (<QamIndex />);
    }else if(location.pathname === '/qam/qdm'){
      return (<PdmIndex />);
    }else if(location.pathname === '/qam/qdm/monitor-details/netlink'){
      return (<NetLink />);
    }else if(location.pathname === '/qam/qdm/monitor-details/baseserver'){
      return (<BaseServer />);
    }else if(location.pathname === '/qam/qdm/monitor-details/idclink'){
      return (<IdcLink />);
    }else if(location.pathname === '/qam/qdm/monitor-details/netlink/details'){
      return (<NetLinkDetails />);
    }else if(location.pathname === '/qam/qdm/monitor-details/idclink/details'){
      return (<IdcLinkDetails />);
    }else if(location.pathname === '/qam/qdm/monitor-details/baseserver/quota'){
      return (<BaseServerQuota />);
    }else if(location.pathname === '/qam/qdm/monitor-details/baseserver/details'){
      return (<BaseServerDetails />);
    }else if(location.pathname === '/qam/qdm/monitor-details/baseserver/quota/details'){
      return (<BaseServerQuotaDetails />);
    }else if(location.pathname === '/dashboard'){
      return (<Dashboard />);
    }else if(location.pathname === '/feedback'){
      return (<Feedback />);
    }
    else{
      return (<NotFound />);
    }
  }
}

Todos.propTypes = {};

export default Todos;
