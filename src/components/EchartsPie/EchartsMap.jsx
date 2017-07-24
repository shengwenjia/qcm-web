import React, { Component, PropTypes } from 'react';

var echarts = require('echarts'); // 核心组件
require('echarts/map/js/china'); // 地图插件

export class EchartsMap extends Component {
  constructor(props) {
    super(props);
    
  }

  initMap(){
    const { data } = this.props;
    let myChart = echarts.init(this.refs.mapReact); // 初始化echarts
    
    // 定义一个setOption方法将data传入option中
    let options = this.setMapOption(data);
    // 设置option
    myChart.setOption(options);
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate(prevProps, prevState) {
    this.initMap();
  }

  render() {
    return (
      <div ref='mapReact' style={{width: '100%', height: '100%'}}></div>
    );
  }

  //基本echarts图表配置函数
  setMapOption(data){
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}'
      },
      series: [
        {
          name: '中国',
          type: 'map',
          map: 'china',
          label: {
              normal: {
                  show: true
              },
              emphasis: {
                  show: true,
                  textStyle:{
                      color: '#000',
                  }
              }
          },
          itemStyle: {
              emphasis: {
                  areaColor: "#66CCFF",
              }
          },
          left: 20,
          data: data // 从外部传入的data
        }
      ]
    };
  }
}

EchartsMap.propTypes = {
  data: PropTypes.array
};

export default EchartsMap;