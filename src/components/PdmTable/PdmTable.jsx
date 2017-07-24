import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Table } from 'antd';

class PdmTable extends Component {
  constructor(props) {
    super(props);
    
  }

  render(){
    const { hasParamName, data, loading } = this.props;
    let columns = [];
    if(hasParamName){
      columns = [{
        title: '参数名',
        dataIndex: 'param_name',
        key: 'param_name',
        width: '45%'
      },{
        title: '值',
        dataIndex: 'value',
        key: 'value',
        width: '15%',
        render: (text, record, index) => {
          if(index == 1){
            if(text > 0){
              return (<Link to={this.props.linkUrl} onClick={this.handleClick.bind(this)}><span style={{color: '#CC3333',}}><b>{text}</b></span></Link>);
            }else{
              return (<Link to={this.props.linkUrl} onClick={this.handleClick.bind(this)}><span><b>{text}</b></span></Link>);
            }
          }else{
            return (<Link to={this.props.linkUrl} onClick={this.handleClick.bind(this)}><span><b>{text}</b></span></Link>);
          }
        }
      },{
        title: '详情',
        dataIndex: 'details',
        key: 'details',
        width: '40%',
        render: (text, record, index) => {
          if(index == 1){
            const err = text.split('/')[0];
            const sum = text.split('/')[1];
            if(err > 0){
              return (<p><span style={{color: '#CC3333',}}>{err}</span><span>/{sum}</span></p>);
            }else{
              return (<p><span>{err}</span><span>/{sum}</span></p>);
            }
          }else{
            return (<span>{text}</span>);
          }
        }
      }];
    }else{
      columns = [{
        title: '值',
        dataIndex: 'value',
        key: 'value',
        width: '30%',
        render: (text, record, index) => {
          if(index == 1){
            if(text > 0){
              return (<Link to={this.props.linkUrl} onClick={this.handleClick.bind(this)}><span style={{color: '#CC3333',}}><b>{text}</b></span></Link>);
            }else{
              return (<Link to={this.props.linkUrl} onClick={this.handleClick.bind(this)}><span><b>{text}</b></span></Link>);
            }
          }else{
            return (<Link to={this.props.linkUrl} onClick={this.handleClick.bind(this)}><span><b>{text}</b></span></Link>);
          }
        }
      },{
        title: '详情',
        dataIndex: 'details',
        key: 'details',
        width: '70%',
        render: (text, record, index) => {
          if(index == 1){
            const err = text.split('/')[0];
            const sum = text.split('/')[1];
            if(err > 0){
              return (<p><span style={{color: '#CC3333',}}>{err}</span><span>/{sum}</span></p>);
            }else{
              return (<p><span>{err}</span><span>/{sum}</span></p>);
            }
          }else{
            return (<span>{text}</span>);
          }
        }
      }];
    }
    

    return (<Table columns={columns} dataSource={data} loading={loading} pagination={false} bordered />);
  }

  handleClick(){
    const { dispatch } = this.props;
    //console.log('error');
    dispatch({
      type: 'dispatch/status',
      payload: 1,
    });
  }
}

PdmTable.propTypes = {
  hasParamName: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  linkUrl: PropTypes.string,
};

function filter(todos){
 return { ...todos };
}

function mapStateToProps({ todos }){
  return {
    todos: filter(todos),
  };
}

export default connect(mapStateToProps)(PdmTable);