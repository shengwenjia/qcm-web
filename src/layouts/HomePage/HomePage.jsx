import React, { PropTypes } from 'react';
import { Link } from 'react-router';
 
import { Icon, Carousel } from 'antd';

import HomePageNav from '../../components/HomePageNav/HomePageNav';

import styles from './HomePage.less';

import GuidePage from '../../components/GuidePage/GuidePage';


const HomePage = () => {
  return (
    <div className={styles.container}>
      <HomePageNav />
      {/* banner 图 */}
      <Carousel effect="fade" autoplay className={styles.top_banner}>
        <div style={{ height: "590px" }}>
          <img src="/static/images/banner.jpg" height="100%" width="100%" />
          <div className={styles.banner_title}>
            <p>IT性能监控法宝</p>
          </div>
          <div className={styles.banner_introduce}>
            <p>端到端一站式云监控，保障IT系统稳定性</p>
          </div>
        </div>
        <div style={{ height: "590px" }}>
          <img src="/static/images/banner.jpg" height="100%" width="100%" />
          <div className={styles.banner_title}>
            <p>IT性能监控法宝</p>
          </div>
          <div className={styles.banner_introduce}>
            <p>端到端一站式云监控，保障IT系统稳定性</p>
          </div>
        </div>
      </Carousel>

      {/* 主体部分 */}
      <div className={styles.content}>
        <ul className={styles.main_kinds}>
          <li>
            <a href="/qsm" className={styles.kinds_content}>
              <Icon type="bar-chart" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>站点性能监控(QSM)</span>
            </a>
          </li>
          <li>
            <a href="http://qrd.qiyi.domain" target="_blank" className={styles.kinds_content}>
              <Icon type="cloud-o" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>即时检测(QRD)</span>
            </a>
          </li>          
          <li>
            <a href="/qam" className={styles.kinds_content}>
              <Icon type="share-alt" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>应用拓扑监控(QAM)</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="solution" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>自定义监控(QCM)</span>
            </a>
          </li>
        </ul>
        <ul className={styles.main_kinds}>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="desktop" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>服务器监控(QBM)</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="mobile" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>监控APP(QMM)</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="bulb" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>奇目告警(QIA)</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="pie-chart" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>监控数据报告(QDR)</span>
            </a>
          </li>
        </ul>
        <ul className={styles.main_kinds}>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="heart-o" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>奇目自愈(QSH)</span>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" className={styles.kinds_content} style={{color: '#555454'}}>
              <Icon type="line-chart" className={styles.kinds_icon} />
              <span className={styles.kinds_introduce}>资源决策(QDM)</span>
            </a>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

HomePage.propTypes={
};

export default HomePage;