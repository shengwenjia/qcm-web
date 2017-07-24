import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

class ResEchartsLine extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { dataSource } = this.props;
    const option = {
      title: {
        text: '响应时间',
        subtext: '源IP：' + this.props.src_ip +' 目标IP：' + this.props.dst_ip,
        subtextStyle: {
          color: '#999',
        },
        top: 0,
        left: 200,
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}：{c}ms'
      },
      xAxis: {
        //data: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'] // 对应的时间段
        data: dataSource.time_quantum
      },
      yAxis: {
        name: '',
        splitLine: {
          show: false
        },
      },
      toolbox: {
        left: 'center',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [{ // 拖动轴
        start: 0,
        end: 100,
      }, {
        type: 'inside'
      }],
      // visualMap: {
      //   top: 10,
      //   right: 10,
      //   pieces: [{
      //     gt: 0,
      //     lte: 50,
      //     color: '#096'
      //   }, {
      //     gt: 50,
      //     lte: 100,
      //     color: '#ffde33'
      //   }, {
      //     gt: 100,
      //     lte: 150,
      //     color: '#ff9933'
      //   }, {
      //     gt: 150,
      //     lte: 200,
      //     color: '#cc0033'
      //   }, {
      //     gt: 200,
      //     lte: 300,
      //     color: '#660099'
      //   }, {
      //     gt: 300,
      //     color: '#7e0023'
      //   }],
      //   outOfRange: {
      //     color: '#999'
      //   },
      //   itemHeight: 10,
      //   itemGap: 5
      // },
      series: {
        name: '响应时间',
        type: 'line',        
        symbol: 'none',
        areaStyle: {
          normal: {
            color: '#c23531',
            opacity: '0.1'
          }
        },
        lineStyle: {
          normal: {
            color: '#c23531',
            opacity: '0.9'
          }
        },
        smooth: true,
        smoothMonotone: 'x',
        sampling: 'average',
        //data: [40, 10, 200, 300, 500, 20], //对应的数据
        data: dataSource.time_quantum_value,
        // markLine: {
        //   silent: true,
        //   data: [{
        //     yAxis: 50
        //   }, {
        //     yAxis: 100
        //   }, {
        //     yAxis: 150
        //   }, {
        //     yAxis: 200
        //   }, {
        //     yAxis: 300
        //   }]
        // }
      }
    };
    return (
      <ReactEcharts option={option} notMerge={true} lazyUpdate={true} style={this.props.style} showLoading={this.props.loading} />
    );
  }
}

ResEchartsLine.propTypes = {
  style: PropTypes.any.isRequired,
  dataSource: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  src_ip: PropTypes.string,
  dst_ip: PropTypes.string,
};

export default ResEchartsLine;