import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './Logo.less';

const Logo = () => {
  return (
    <div className={styles.logoMain}>
      <Link>
        <h2 className={styles.logoTxt}>QIM2.0 | 云监控</h2>
        <span style={{color: '#fff', marginTop: '10px'}}>(Beta版)</span>
      </Link>
    </div>
  );
};

export default Logo;