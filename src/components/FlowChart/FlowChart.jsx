import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import styles from './FlowChart.less';

/* 初始化拓扑图样式 */
var rmpserver_1_style = {};
var rmpserver_2_style = {};
var bianmaji_style = {};
var cutter_style = {};
var bianmaji_rmp1_style = {width: '380px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
var bianmaji_rmp1_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
var bianmaji_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
var bianmaji_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom:'5px solid transparent',float: 'left'};
var cutter_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
var cutter_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
var beijing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
var beijing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
var beijing_bianmaji_style = {width: '190px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
var beijing_bianmaji_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
var chongqing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
var chongqing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
var bianmaji_rmp1_idctask_style = {width: '387px', height: '1px', float: 'left', backgroundColor: '#5B9BD5', margin: '9px -7px 0 -7px'};
var bianmaji_rmp1_idctask_triangle = {color: '#5B9BD5', float: 'left', lineHeight: '20px'};
var bianmaji_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#5B9BD5', margin: '9px -7px 0 -7px'};
var bianmaji_rmp2_idctask_triangle = {color: '#5B9BD5', float: 'left', lineHeight: '20px'};
var cutter_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#5B9BD5', margin: '9px -7px 0 -7px'};
var cutter_rmp2_idctask_triangle = {color: '#5B9BD5', float: 'left', lineHeight: '20px'};

var bianma_spot = <p>[<span>0</span>/0]</p>;
var bianmaji = <p>[<span>0</span>/0]</p>;
var rmpserver_1 = <p>[<span>0</span>/3]</p>;
var bianmaji_rmp1 = <p style={{marginTop: '-10px'}}>网络链路：[<span>0</span>/0]</p>;    
var rmpserver_2 = <p>[<span>0</span>/0]</p>;
var cutter = <p>[<span>0</span>/0]</p>;
var bianmaji_rmp2 = <p>[<span>0</span>/0]</p>;
var cutter_rmp2 = <p>[<span>0</span>/0]</p>;
var beijing_beijing = <p>[<span>0</span>/0]</p>;
var beijing_bianmaji = <p>[<span>0</span>/0]</p>;
var chongqing_beijing = <p>[<span>0</span>/0]</p>;

var bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span style={{color: '#CC3333'}}>0</span>/0]</p>;
var bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span style={{color: '#CC3333'}}>0</span>/0]</p>;
var cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span style={{color: '#CC3333'}}>0</span>/0]</p>;

class FlowChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topodata: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data;    
    if(typeof(data) != 'undefined'){
      // console.log(data);

      this.setState({
        topodata: data,
      });
    }
  }

  render(){
    /* 初始化拓扑数据 */
    const { todos, dispatch } = this.props;
    const { isopenaddtmp, tmpsummarydata } = todos.getQdmIndexData;
    const topodata = this.state.topodata;

    if(isopenaddtmp && tmpsummarydata.toponodes_alarm_summary) {
      this.initNodeStyle();
      bianma_spot = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode.total_ip_count}]</p>;
      bianmaji = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode.total_ip_count}]</p>;
      rmpserver_1 = <p>[<span>0</span>/3]</p>;
      bianmaji_rmp1 = <p style={{marginTop: '-10px'}}>网络链路：[<span>{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_total_count}]</p>;    
      rmpserver_2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.rtmp.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.rtmp.total_ip_count}]</p>;
      cutter = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cutter.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cutter.total_ip_count}]</p>;
      bianmaji_rmp2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_total_count}]</p>;
      cutter_rmp2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_total_count}]</p>;
      beijing_beijing = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_total_count}]</p>;
      chongqing_beijing = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_total_count}]</p>;
      beijing_bianmaji = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_total_count}]</p>;

      bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span style={{color: '#CC3333'}}>{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_total_count}]</p>;
      bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span style={{color: '#CC3333'}}>{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_total_count}]</p>;
      cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span style={{color: '#CC3333'}}>{tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_total_count}]</p>;
      
          /****************** 节点 ***********************/      
            if(tmpsummarydata.toponodes_alarm_summary.rtmp.error_ip_count > 0){
              rmpserver_2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.rtmp.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.rtmp.total_ip_count}]</p>;
              rmpserver_2_style = {backgroundColor: '#F48137'};
            }else{
              rmpserver_2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.rtmp.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.rtmp.total_ip_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.encode.error_ip_count > 0){
              bianmaji = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode.total_ip_count}]</p>;
              bianmaji_style = {backgroundColor: '#F48137'};
            }else{
              bianmaji = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode.total_ip_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.cutter.error_ip_count > 0){
              cutter = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cutter.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cutter.total_ip_count}]</p>;
              cutter_style = {backgroundColor: '#F48137'};
            }else{
              cutter = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cutter.error_ip_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cutter.total_ip_count}]</p>;
            }

          /* 网络链路 */
            if(tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_error_count > 0){
              bianmaji_rmp1 = <p>网络链路：[<span>{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_total_count}]</p>;
              bianmaji_rmp1_style = {backgroundColor: '#F48137',width: '380px',height: '1px',float: 'left',marginTop: '4px'};
              bianmaji_rmp1_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'}
            }else{
              bianmaji_rmp1 = <p>网络链路：[<span>{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp1.alarm_total_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_error_count > 0){
              bianmaji_rmp2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_total_count}]</p>;
              bianmaji_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              bianmaji_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom:'5px solid transparent',float: 'left'};
            }else{
              bianmaji_rmp2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.encode_to_rtmp.alarm_total_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_error_count > 0){
              cutter_rmp2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_total_count}]</p>;
              cutter_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
              cutter_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
            }else{
              cutter_rmp2 = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cutter_to_rtmp.alarm_total_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_error_count > 0){
              beijing_beijing = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_total_count}]</p>;
              beijing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              beijing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
            }else{
              beijing_beijing = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.bjoa_to_bjyanboshi.alarm_total_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_error_count > 0){
              chongqing_beijing = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_total_count}]</p>;
              chongqing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              chongqing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
            }else{
              chongqing_beijing = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.cqoa_to_bjoa.alarm_total_count}]</p>;
            }

            if(tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_error_count > 0){
              beijing_bianmaji = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_total_count}]</p>;
              beijing_bianmaji_style = {width: '190px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              beijing_bianmaji_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
            }else{
              beijing_bianmaji = <p>[<span>{tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.bjyanboshi_to_encode.alarm_total_count}]</p>;
            }

          /* 专线流量 */
            if(tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_error_count > 0){
              bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span>{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_total_count}]</p>;
              bianmaji_rmp1_idctask_style = {width: '387px', height: '1px', float: 'left', backgroundColor: '#F48137', margin: '9px -7px 0 -7px'};
              bianmaji_rmp1_idctask_triangle = {color: '#F48137', float: 'left', lineHeight: '20px'};
            }else{
              bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span>{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp1.alarm_total_count}]</p>;
            }    

            if(tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_error_count > 0){
              bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_total_count}]</p>;
              bianmaji_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#F48137', margin: '9px -7px 0 -7px'};
              bianmaji_rmp2_idctask_triangle = {color: '#F48137', float: 'left', lineHeight: '20px'};
            }else{
              bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_encode_rtmp2.alarm_total_count}]</p>;
            }
            
            if(tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_error_count > 0){
              cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_total_count}]</p>;
              cutter_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#F48137', margin: '9px -7px 0 -7px'};
              cutter_rmp2_idctask_triangle = {color: '#F48137', float: 'left', lineHeight: '20px'};
            }else{
              cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_error_count}</span>/{tmpsummarydata.toponodes_alarm_summary.idc_cutter_rtmp.alarm_total_count}]</p>;
            }

    } else {
      this.initNodeStyle();
      bianma_spot = <p>[<span>0</span>/0]</p>;
      bianmaji = <p>[<span>0</span>/0]</p>;
      rmpserver_1 = <p>[<span>0</span>/3]</p>;
      bianmaji_rmp1 = <p style={{marginTop: '-10px'}}>网络链路：[<span>0</span>/0]</p>;    
      rmpserver_2 = <p>[<span>0</span>/0]</p>;
      cutter = <p>[<span>0</span>/0]</p>;
      bianmaji_rmp2 = <p>[<span>0</span>/0]</p>;
      cutter_rmp2 = <p>[<span>0</span>/0]</p>;
      beijing_beijing = <p>[<span>0</span>/0]</p>;
      chongqing_beijing = <p>[<span>0</span>/0]</p>;
      beijing_bianmaji = <p>[<span>0</span>/0]</p>;
      chongqing_beijing = <p>[<span>0</span>/0]</p>;

      bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span style={{color: '#CC3333'}}>0</span>/0]</p>;
      bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span style={{color: '#CC3333'}}>0</span>/0]</p>;
      cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span style={{color: '#CC3333'}}>0</span>/0]</p>;

      /* 动态获取的异常/总数数据 */
      if(topodata.length > 0){
        for(let value of topodata){  
          /****************** 节点 ***********************/      
          if(value.toponode_id == 11){
            if(value.error_ip_count > 0){
              rmpserver_1 = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
              rmpserver_1_style = {backgroundColor: '#F48137'};
            }else{
              rmpserver_1 = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
            }
          }               
          if(value.toponode_id == 12){
            if(value.error_ip_count > 0){
              rmpserver_2 = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
              rmpserver_2_style = {backgroundColor: '#F48137'};
            }else{
              rmpserver_2 = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
            }
          }
          if(value.toponode_id == 13){
            if(value.error_ip_count > 0){
              bianmaji = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
              bianmaji_style = {backgroundColor: '#F48137'};
            }else{
              bianmaji = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
            }
          }
          if(value.toponode_id == 14){
            if(value.error_ip_count > 0){
              cutter = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
              cutter_style = {backgroundColor: '#F48137'};
            }else{
              cutter = <p>[<span>{value.error_ip_count}</span>/{value.total_ip_count}]</p>;
            }
          }
          /* 网络链路 */
          if(value.toponode_id == 17){
            if(value.alarm_error_count > 0){
              bianmaji_rmp1 = <p>网络链路：[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              bianmaji_rmp1_style = {backgroundColor: '#F48137',width: '380px',height: '1px',float: 'left',marginTop: '4px'};
              bianmaji_rmp1_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'}
            }else{
              bianmaji_rmp1 = <p>网络链路：[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          if(value.toponode_id == 18){
            if(value.alarm_error_count > 0){
              bianmaji_rmp2 = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              bianmaji_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              bianmaji_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom:'5px solid transparent',float: 'left'};
            }else{
              bianmaji_rmp2 = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          if(value.toponode_id == 19){
            if(value.alarm_error_count > 0){
              cutter_rmp2 = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              cutter_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
              cutter_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
            }else{
              cutter_rmp2 = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          if(value.toponode_id == 20){
            if(value.alarm_error_count > 0){
              beijing_beijing = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              beijing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              beijing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
            }else{
              beijing_beijing = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          if(value.toponode_id == 21){
            if(value.alarm_error_count > 0){
              beijing_bianmaji = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              beijing_bianmaji_style = {width: '190px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              beijing_bianmaji_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
            }else{
              beijing_bianmaji = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          /* 专线流量 */
          if(value.toponode_id == 22){
            if(value.alarm_error_count > 0){
              bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              bianmaji_rmp1_idctask_style = {width: '387px', height: '1px', float: 'left', backgroundColor: '#F48137', margin: '9px -7px 0 -7px'};
              bianmaji_rmp1_idctask_triangle = {color: '#F48137', float: 'left', lineHeight: '20px'};
            }else{
              bianmaji_rmp1_idctask = <p style={{marginTop: '-10px'}}>专线流量：[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }        
          }
          if(value.toponode_id == 23){
            if(value.alarm_error_count > 0){
              bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              bianmaji_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#F48137', margin: '9px -7px 0 -7px'};
              bianmaji_rmp2_idctask_triangle = {color: '#F48137', float: 'left', lineHeight: '20px'};
            }else{
              bianmaji_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          if(value.toponode_id == 24){
            if(value.alarm_error_count > 0){
              cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              cutter_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#F48137', margin: '9px -7px 0 -7px'};
              cutter_rmp2_idctask_triangle = {color: '#F48137', float: 'left', lineHeight: '20px'};
            }else{
              cutter_rmp2_idctask = <p style={{marginTop: '-10px'}}>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
          if(value.toponode_id == 26){
            if(value.alarm_error_count > 0){
              chongqing_beijing = <p>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
              chongqing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#F48137',float: 'left',marginTop: '4px'};
              chongqing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #F48137',borderBottom: '5px solid transparent',float: 'left'};
            }else{
              chongqing_beijing = <p style={{marginTop: '-10px'}}>[<span>{value.alarm_error_count}</span>/{value.alarm_total_count}]</p>;
            }
          }
        }
      }
    }

    

    /* 动态获取测试时候的异常/总数数据 */
    const bianma_4G_spot = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const jiema_4G = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const satellite_receiver = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const haivisioin_1 = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const haivisioin_2 = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const cdn = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    // const chongqing_beijing = [
    //   <p key='0'>[<span>0</span>/0]</p>
    // ];
    const chongqing_satellite = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const beijing_havisionin_1 = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const beijing_4g = [
      <p key='0'>[<span>0</span>/0]</p>
    ];
    const beijingyanboshi_4g = [
      <p key='0'>[<span>0</span>/0]</p>
    ];

    return (
      <div className={styles.container}>
        <div className={styles.chart_part_1}>
          <p>现场编码推送</p>
          <Link style={{color: '#fff'}}>{bianma_spot}</Link>
        </div>        
        <div className={styles.chart_part_2} style={rmpserver_1_style}>
          <p>RTMPSERVER 1</p>
          <Link to='/qam/qdm/monitor-details/baseserver' style={{color: '#fff'}} onClick={() => this.handleClickServer(11)}>{rmpserver_1}</Link>
        </div>
        <div className={styles.chart_part_3}>
          <p>现场4G编码</p>
          <Link style={{color: '#fff'}}>{bianma_4G_spot}</Link>
        </div>        
        <div className={styles.chart_part_4}>
          <p>4G解码</p>
          <Link style={{color: '#fff'}}>{jiema_4G}</Link>
        </div>
        <div className={styles.chart_part_5}>
          <p>重庆OA监测点</p>
        </div>
        <div className={styles.cq_sat}>
          <p style={{ padding: '0 0' }}>重庆卫星接收机</p>
        </div>   
        <div className={styles.bj_sat}>
          <p style={{ padding: '0 0' }}>北京卫星接收机</p>
        </div>   
        <div className={styles.sh_sat}>
          <p style={{ padding: '0 0' }}>上海卫星接收机</p>
        </div>   
        <div className={styles.chart_part_7}>
          <p>Haivisioin 1</p>
          <Link style={{color: '#fff'}}>{haivisioin_1}</Link>
        </div>
        <div className={styles.chart_part_8}>
          <Link to='/qam/qdm/monitor-details/baseserver' style={{color: '#fff'}} onClick={() => this.handleClickServer(15)}>北京OA监测点</Link>
        </div>
        <div className={styles.chart_part_9}>
          <Link to='/qam/qdm/monitor-details/baseserver' style={{color: '#fff'}} onClick={() => this.handleClickServer(16)}>北京演播室监测点</Link>
        </div>
        <div className={styles.chart_part_10}>
          <p>Haivisioin 2</p>
          <Link style={{color: '#fff'}}>{haivisioin_2}</Link>
        </div>
        <div className={styles.chart_part_11} style={bianmaji_style}>
          <p>编码机</p>
          <Link to='/qam/qdm/monitor-details/baseserver' style={{color: '#fff'}} onClick={() => this.handleClickServer(13)}>{bianmaji}</Link>
        </div>
        <div className={styles.chart_part_12} style={rmpserver_2_style}>
          <p>RTMPSERVER 2</p>
          <Link to='/qam/qdm/monitor-details/baseserver' style={{color: '#fff'}} onClick={() => this.handleClickServer(12)}>{rmpserver_2}</Link>
        </div>
        <div className={styles.chart_part_13} style={cutter_style}>
          <p>Cutter</p>
          <Link to='/qam/qdm/monitor-details/baseserver' style={{color: '#fff'}} onClick={() => this.handleClickServer(14)}>{cutter}</Link>
        </div>
        <div className={styles.chart_part_14}>
          <p>CDN</p>
          <Link style={{color: '#fff'}}>{cdn}</Link>
        </div>
        <div className={styles.line_container_1}>
          <div className={styles.dotted_line}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_2}>          
          <div className={styles.dotted_line}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_3}>
          {/*<Link style={{color: '#000', position: 'absolute', top: '10px', left: '10px'}}>{chongqing_satellite}</Link>*/}
          <div className={styles.dotted_line_cq_sati}></div>
          <div className={styles.down_triangle_blue}></div>
        </div>
        <div className={styles.line_container_3_add}>
          {/*<Link style={{color: '#000', position: 'absolute', top: '10px', left: '10px'}}>{chongqing_satellite}</Link>*/}
          <div className={styles.left_triangle_blue}></div>
          <div className={styles.dotted_line}></div>
        </div>
        <div className={styles.line_container_4}>
          <div className={styles.dotted_line}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_5}>
          <Link to='/qam/qdm/monitor-details/netlink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickNetLink(26)}>{chongqing_beijing}</Link>
          <div style={chongqing_beijing_style}></div>
          <div style={chongqing_beijing_triangle}></div>
        </div>
        <div className={styles.line_container_6}>
          {/*<Link style={{color: '#000', position: 'absolute', top: '10px', left: '10px'}}>{beijing_havisionin_1}</Link>*/}
          <div className={styles.left_triangle_blue}></div>
          <div className={styles.dotted_line}></div>
        </div>
        <div className={styles.line_container_7}>
          <Link to='/qam/qdm/monitor-details/netlink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickNetLink(20)}>{beijing_beijing}</Link>
          <div style={beijing_beijing_style}></div>
          <div style={beijing_beijing_triangle}></div>
        </div>
        <div className={styles.line_container_8}>
          {/*<Link style={{color: '#000', position: 'absolute', top: '10px', left: '10px'}}>{beijing_4g}</Link>*/}
          <div className={styles.top_triangle_blue}></div>
          <div className={styles.dotted_line_blue}></div>        
        </div>
        <div className={styles.line_container_9}>
          {/*<Link style={{color: '#000', textAlign: 'center'}}>{beijingyanboshi_4g}</Link>*/}
          <div className={styles.left_triangle_blue}></div>
          <div className={styles.dotted_line}></div>          
        </div>
        <div className={styles.line_container_10}>
          <div className={styles.dotted_line}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_11}>
          <Link to='/qam/qdm/monitor-details/netlink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickNetLink(21)}>{beijing_bianmaji}</Link>
          <div style={beijing_bianmaji_style}></div>
          <div style={beijing_bianmaji_triangle}></div>
        </div>
        <div className={styles.line_container_12}>
          <div className={styles.dotted_line_1}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_13}>
          <div className={styles.dotted_line_2}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_15}>
          <Link to='/qam/qdm/monitor-details/netlink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickNetLink(17)} >{bianmaji_rmp1}</Link>
          <div style={bianmaji_rmp1_triangle}></div>
          <div style={bianmaji_rmp1_style}></div>          
        </div>
        <div className={styles.line_container_idctask_15}>
          <div style={{height: '20px'}}>
            <Icon type="left" style={bianmaji_rmp1_idctask_triangle} />
            <div style={bianmaji_rmp1_idctask_style}></div>
            <Icon type="right" style={bianmaji_rmp1_idctask_triangle} />            
          </div>          
          <Link to='/qam/qdm/monitor-details/idclink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickIdc(22)}>{bianmaji_rmp1_idctask}</Link>          
        </div>
        <div className={styles.dotted_line_3}></div>
        <div className={styles.dotted_line_4}></div>
        <div className={styles.dotted_line_4_add1}></div>
        <div className={styles.dotted_line_4_add2}></div>
        <div className={styles.line_container_16}>
          <div className={styles.dotted_line_5}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_17}>
          <div className={styles.dotted_line_6}></div>
          <div className={styles.right_triangle}></div>
        </div>
        <div className={styles.line_container_18}>
          <Link to='/qam/qdm/monitor-details/netlink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickNetLink(18)}>{bianmaji_rmp2}</Link>
          <div style={bianmaji_rmp2_style}></div>
          <div style={bianmaji_rmp2_triangle}></div>
        </div>
        <div className={styles.line_container_idctask_18}>
          <div style={{height: '20px'}}>
            <Icon type="left" style={bianmaji_rmp2_idctask_triangle} />
            <div style={bianmaji_rmp2_idctask_style}></div>
            <Icon type="right" style={bianmaji_rmp2_idctask_triangle} />            
          </div>          
          <Link to='/qam/qdm/monitor-details/idclink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickIdc(23)}>{bianmaji_rmp2_idctask}</Link>          
        </div>
        <div className={styles.line_container_19}>
          <Link to='/qam/qdm/monitor-details/netlink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickNetLink(19)}>{cutter_rmp2}</Link>
          <div style={cutter_rmp2_triangle}></div>
          <div style={cutter_rmp2_style}></div>          
        </div>
        <div className={styles.line_container_idctask_19}>
          <div style={{height: '20px'}}>
            <Icon type="left" style={cutter_rmp2_idctask_triangle} />
            <div style={cutter_rmp2_idctask_style}></div>
            <Icon type="right" style={cutter_rmp2_idctask_triangle} />            
          </div>          
          <Link to='/qam/qdm/monitor-details/idclink' style={{color: '#000', textAlign: 'center'}} onClick={() => this.handleClickIdc(24)}>{cutter_rmp2_idctask}</Link>          
        </div>
      </div>
    );
  }

  /*********** 基础服务器跳转 ************/
  handleClickServer(id){
    this.props.dispatch({
      type: 'dispatchId/details',
      payload: id,
    });  
    if(id == 11) {
      if(rmpserver_1.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 12) {
      if(rmpserver_2.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 13) {
      if(bianmaji.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 14) {
      if(cutter.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    }
  }
  /*********** 网络链路跳转 ************/
  handleClickNetLink(id){
    this.props.dispatch({
      type: 'dispatchId/details',
      payload: id,
    });
    if(id == 17) {
      if(bianmaji_rmp1.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 18) {
      if(bianmaji_rmp2.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 19) {
      if(cutter_rmp2.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 20) {
      if(beijing_beijing.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 21) {
      if(beijing_bianmaji.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }

    } else if(id == 26) {
      if(chongqing_beijing.props.children[1].props.children > 0) {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "1",
          });
      } else {
          this.props.dispatch({
            type: 'dispatch/status',
            status: "0",
          });
      }
    }
  }
  /*********** 专线流量跳转 ************/
  handleClickIdc(id){
    this.props.dispatch({
      type: 'dispatchId/details',
      payload: id,
    });   
  }

  initNodeStyle() {
    /* 初始化拓扑图样式 */
    rmpserver_1_style = {};
    rmpserver_2_style = {};
    bianmaji_style = {};
    cutter_style = {};
    bianmaji_rmp1_style = {width: '380px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
    bianmaji_rmp1_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
    bianmaji_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
    bianmaji_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom:'5px solid transparent',float: 'left'};
    cutter_rmp2_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderRight: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
    cutter_rmp2_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
    beijing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
    beijing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
    beijing_bianmaji_style = {width: '190px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
    beijing_bianmaji_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
    chongqing_beijing_style = {width: '90px',height: '1px',backgroundColor: '#5B9BD5',float: 'left',marginTop: '4px'};
    chongqing_beijing_triangle = {width:0,height:0,borderTop: '5px solid transparent',borderLeft: '10px solid #5B9BD5',borderBottom: '5px solid transparent',float: 'left'};
    bianmaji_rmp1_idctask_style = {width: '387px', height: '1px', float: 'left', backgroundColor: '#5B9BD5', margin: '9px -7px 0 -7px'};
    bianmaji_rmp1_idctask_triangle = {color: '#5B9BD5', float: 'left', lineHeight: '20px'};
    bianmaji_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#5B9BD5', margin: '9px -7px 0 -7px'};
    bianmaji_rmp2_idctask_triangle = {color: '#5B9BD5', float: 'left', lineHeight: '20px'};
    cutter_rmp2_idctask_style = {width: '87px', height: '1px', float: 'left', backgroundColor: '#5B9BD5', margin: '9px -7px 0 -7px'};
    cutter_rmp2_idctask_triangle = {color: '#5B9BD5', float: 'left', lineHeight: '20px'};
  }
}

FlowChart.propTypes = {};

function filter(todos) {
  return { ...todos };
}

function mapStateToProps({ todos }){
  return { todos: filter(todos) };
}

export default connect(mapStateToProps)(FlowChart);