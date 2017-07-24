import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

class IdcLinkEchartsLine extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { dataSource } = this.props;
    const option = {
      title: {
        text: this.props.title,
        subtext: '源IDC：' + this.props.src_idc +' 目标IDC：' + this.props.dst_idc,
        subtextStyle: {
          color: '#999',
        },
        top: 0,
        left: 200,
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />{a}：{c}'
      },
      xAxis: {
        //data: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'] // 对应的时间段
        data: dataSource.time_quantum
      },
      yAxis: {
        // name: '毫秒',
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
      series: {
        name: this.props.title,
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
        //data: [40, 10, 200, 300, 500, 20], //对应的数据
        data: dataSource.time_quantum_value,
      }
    };
    return (
      <ReactEcharts option={option} notMerge={true} lazyUpdate={true} style={this.props.style} showLoading={this.props.showLoading} />
    );
  }
}

IdcLinkEchartsLine.propTypes = {
  style: PropTypes.any.isRequired,
  dataSource: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  title: PropTypes.string,
  src_idc: PropTypes.string,
  dst_idc: PropTypes.string,
};

export default IdcLinkEchartsLine;