import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

class LossEchartsLine extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { dataSource } = this.props;
    const option = {
      title: {
        text: '丢包率',
        subtext: '源IP：' + this.props.src_ip +' 目标IP：' + this.props.dst_ip,
        subtextStyle: {
          color: '#999',
        },
        top: 0,
        left: 200,
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}：{c}%'
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
        max: 100
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
      series: {
        name: '丢包率',
        type: 'line',
        symbol: 'none',
        areaStyle: {
          normal: {
            color: '#99CCFF',
            opacity: '0.3'
          }
        },
        lineStyle: {
          normal: {
            color: '#6699CC'
          }
        },
        smooth: true,
        smoothMonotone: 'x',
        sampling: 'average',
        //data: [40, 10, 3, 5, 50, 10], //对应的数据
        data: dataSource.time_quantum_value,
      }
    };
    return (
      <ReactEcharts option={option} notMerge={true} lazyUpdate={true} style={this.props.style} showLoading={this.props.loading} />
    );
  }
}

LossEchartsLine.propTypes = {
  style: PropTypes.any.isRequired,
  dataSource: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  src_ip: PropTypes.string,
  dst_ip: PropTypes.string,
};

export default LossEchartsLine;