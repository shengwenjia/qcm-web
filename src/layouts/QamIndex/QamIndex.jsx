import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Icon } from 'antd';

import TwoLevelNav from '../../components/TwoLevelNav/TwoLevelNav';
import styles from './QamIndex.less';

class QamIndex extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {

    return (
      <div>
        <div className={styles.subheader}>
          <div className={styles.wrapper}>
            <TwoLevelNav defaultSelectedKeys={['2']} />
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.breadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>
                {/*<Link to='/'>首页</Link>*/}
                <Link to='/dashboard'>首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>应用拓扑监控</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.views} title='点击查看直播链路详情'>
                {/*<Link to='/qam/qdm' className={styles.corner}>
                  直播链路监控
                </Link>*/}
                <ul className={styles.main_kinds}>
                  <li>
                    <Link to="/qam/qdm" className={styles.kinds_content}>
                      <Icon type="share-alt" className={styles.kinds_icon} />
                      <span className={styles.kinds_introduce}>应用拓扑监控(QAM)</span>
                    </Link>
                  </li>
                </ul>
              </div>         
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

QamIndex.propTypes = {};

export default QamIndex;