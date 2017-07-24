import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Icon, Modal, Tooltip } from 'antd';
import styles from './Feedback.less';

const text = <a href="http://wiki.qiyi.domain/pages/viewpage.action?pageId=10749030" target="_blank" style={{ color: "#fff" }}>订阅帮助</a>;

class Feedback extends Component {

    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    handleOk() {
        this.setState({
            visible: false
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    showGroup() {
        this.setState({
            visible: true
        });
    }

    render() {
        return (
            <div>
                <div className={styles.breadcrumb}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to='/dashboard'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>意见反馈</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <ul className={styles.main_kinds}>
                  <li>
                      <Tooltip placement="bottom" title={text}>
                        <a href="http://dev.qiyi.com/mailman/listinfo/qcm-users" target="_blank" className={styles.kinds_content}>
                            <Icon type="solution" className={styles.kinds_icon} />
                            <span className={styles.kinds_introduce}>订阅邮件组</span>
                            <span className={styles.sub_kinds_introduce}>第一时间收到版本更新通知</span>
                        </a>
                    </Tooltip>
                  </li>

                  <li>
                    <a href="javascript:void(0)" onClick={this.showGroup.bind(this)} className={styles.kinds_content}>
                      <Icon type="usergroup-add" className={styles.kinds_icon} />
                      <span className={styles.kinds_introduce}>加入讨论组</span>
                      <span className={styles.sub_kinds_introduce}>吐槽，问题反馈</span>
                    </a>
                  </li>

                  <li>
                    <a href="mailto:tp_sys_shdev@qiyi.com" className={styles.kinds_content}>
                      <Icon type="mail" className={styles.kinds_icon} />
                      <span className={styles.kinds_introduce}>开发组邮箱</span>
                      <span className={styles.sub_kinds_introduce}>联系开发人员</span>
                    </a>
                  </li>
                </ul>

                <Modal 
                    title="讨论组二维码" 
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)} 
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                >
                    <img className={styles.reliao} src="/static/images/reliao.jpg" height="70%" width="70%" />
                </Modal>

            </div>
        );
    }
}

export default Feedback;