import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

class EchartsLine extends Component{
  constructor(props) {
    super(props);
    this.state = {      
      legends: []
    };

  }
/*  componentWillReceiveProps(nextProps) {
    const { dataSource } = this.props;
    var tmp=nextProps.this.props ? nextProps.this.props : [];
    this.setState({
      lengends:tmp
    });
  }
*/

  render(){
    const { title, legends, xaxis_data, series_data } = this.props;

    // console.log("title: " + title);
    // console.log("legends: " + legends);
    // console.log("xaxis_data: " + xaxis_data);
    // console.log("series_data: " + JSON.stringify(series_data));

    const option = {
      title: {
        text: title,
        textStyle: {
          color: '#000',
          fontSize: 12,
          fontWeight: 100
        },
       top: 0,
      },
      legend: {
        data: legends
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        containLabel: true
      },
      dataZoom: [{ // 拖动轴
        start: 0,
        end: 100,
      }, {
        type: 'inside'
      }],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xaxis_data
      },
      yAxis: {
        type: 'value',
        axisLabel: {                   
            formatter: function (value, index) {           
              return value.toFixed(2);
            }                
         }
      },
      series: series_data
    };
    const loading = false;
    return (
      <ReactEcharts option={option} notMerge={true} lazyUpdate={true} style={{height:'300px', width:'100%'}} showLoading={loading} />
    );
  }
}

EchartsLine.propTypes = {

};

export default EchartsLine;