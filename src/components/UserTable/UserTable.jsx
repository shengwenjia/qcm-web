import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Icon, Input, message } from 'antd';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_id: '',
      dataSource: props.data,
      tel_info: '',
      disabled: props.disabled,
    };
  }

  render(){
    const { data, loading } = this.props;
    const { dispatch } = this.props;

    const columns = [{
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
    },{
      title: 'OA账号',
      key: 'username',
      dataIndex: 'username',
    },{
      title: '手机号码',
      key: 'tel_num',
      dataIndex: 'tel_num',
    },{
      title: '邮箱地址',
      key: 'mail_address',
      dataIndex: 'mail_address',
    },{
      title: '操作',
      key: 'action',
      dataIndex: 'action',
    }];
    const rowSelection = {
      // onChange(selectedRowKeys, selectedRows) {
      //   // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      //   dispatch({
      //     type: 'todos/alarmCreate',
      //     payload: selectedRows
      //   });
      // },

      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
        dispatch({
          type: 'todos/alarmCreate',
          payload: selectedRows
        });
      },

      // getCheckboxProps: function(record) {
      //   return {
      //     // defaultChecked: record.name === 'n1',
      //     defaultChecked: true,
      //   };        
      // },
    };
    const handleAdd = () => { // 新增一行
      const newDataSource = data;
      newDataSource.push({
        name: <Input id="user_name" placeholder="请输入联系人姓名" />,
        username: <Input id="username" placeholder="请不要输入邮箱后缀名" />,
        tel_num: <Input id="tel_num" maxLength='11' placeholder="请输入11位手机号码" />,
        mail_address: <Input id="mail_address" placeholder="请输入邮箱地址" />,
        action: <span>
          <a onClick={() => addUser()}>保存</a>
          <a onClick={() => handleDelete()} style={{marginLeft:'5px'}}>撤销</a>
        </span>
      });
      this.setState({
        dataSource: newDataSource,
        disabled: 'disabled', // 改变按钮状态
      });
    };
    const handleDelete = () => { // 删除一行
      const newDataSource = data;
      newDataSource.pop();
      this.setState({
        dataSource: newDataSource,
        disabled: '', // 初始化按钮状态
      });
    }
    const addUser = () => { // 提交新增用户列表  

      const telphone = $('#tel_num').val();
      const user_name = $('#user_name').val();
      const email = $('#mail_address').val();
      const username = $('#username').val();
      
      const checkTel = /^[1-9]\d*$/;
      const checkMail = /^[0-9a-zA-Z_]+[@]+[0-9a-zA-Z.]+$/;
      if(!checkTel.test(telphone)){
        message.error('请输入正确的电话号码');
      }else if(!checkMail.test(email)){
        message.error('请输入正确的邮箱地址');
      }else{
        const user_info = {
          // task_id: data[0].task_id,
          name: user_name,
          mobile: telphone,
          email: email,
          username: username
        };
        console.log(user_info);

        dispatch({ //请求添加联系人接口
          type: 'todos/addAlarmUser',
          payload: user_info,
        });
        this.setState({
          disabled: '', // 初始化按钮状态
        });
      }      
    };

    return (
      <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} loading={loading} pagination={false} bordered />
      <Button type="primary" style={{margin: '10px 5px'}} onClick={handleAdd} disabled={this.state.disabled}>
        <Icon type="plus-circle-o" />新增联系人
      </Button>
      </div>
    );
  }

}

UserTable.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(UserTable);