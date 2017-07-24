import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

class EchartsPie extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    const name = this.props.idc_name;
    const option = {
      "tooltip": {
        "formatter": '{a}<br />{b} : {c}%'
      },
      "series": [{
        "name": '可用率',
        "type": 'gauge',
        "splitNumber": 5,
        "axisLine": {
          "lineStyle": {
            "color": [
              [0.31, "#F37B1D"],
              [1, "#e9ecf3"]
            ],
            "width": 10,
          }
        },
        "axisTick": {
          "lineStyle": {
              "color": "#3bb4f2",
              "width": 3
          },
          "length": -10,
          "splitNumber": 1
        },
        "axisLabel": {
          "distance": -60,
          "textStyle": {
              "color": "#000"
          }
        },
        "pointer": {
          width: 5,
        },
        "splitLine": {
          "show": false
        },
        "itemStyle": {
          "normal": {
              "color": "#494f50"
          }
        },
        "detail": {
          "formatter": "{value}%",
          "offsetCenter": [0, "60%"],
          "textStyle": {
            "fontSize": 12,
            "color": "#F37B1D"
          }
        },
        "title": {
          "offsetCenter": [0, "100%"]
        },
        "data": [{
          "name": name,
          "value": 0
        }]
      }]
    };

    const value = this.props.usability;
    option.series[0].data[0].value = value;
    option.series[0].axisLine.lineStyle.color[0][0] = value / 100;
    option.series[0].axisLine.lineStyle.color[0][1] = detectionData(value);

    function detectionData(str) { // 通过不同的数据渲染不同的颜色
      // var color = '#5eb95e';
      var color = '#dd514c';
      if (str >= 30 && str <= 60) {
        color = '#F37B1D';
      } else if (str > 60) {
        // color = '#dd514c';
        color = '#5eb95e';
      }
      return color;
    }

    return (
      <ReactEcharts option={option} notMerge={true} lazyUpdate={true} style={{height:'150px', width:'100%'}} />
    );
  }
}

EchartsPie.propTypes = {
  usability: PropTypes.any,
  idc_name: PropTypes.string,
};

export default EchartsPie;