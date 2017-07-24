import React, { Component, PropTypes } from 'react';
import { AutoComplete, Button, Icon, Input, Select } from 'antd';
import classNames from 'classnames';
const Option = Select.Option;

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false,
    }
  }

  render() {
    const { dataSource } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    const handleChange = (value) => {
      this.setState({ value });
    };
    const handleFocus = () => { this.setState({ focus: true }) };
    const handleBlur = () => { this.setState({ focus: false }) };
    /* AutoComplete所需方法 */
    const onSelect = (value) => {
      this.setState({
        value: value,
      });
    }
    const handleSubmit = () => {
      console.log('输入框的内容是：', this.state.value);
    };

    return (
      <div className='ant-search-input-wrapper' style={this.props.style}>
        <Input.Group className={searchCls}>
          <AutoComplete 
          dataSource={dataSource} 
          style={this.props.style} 
          onSelect={onSelect} 
          onChange={handleChange} 
          placeholder={this.props.placeholder} 
          onFocus={handleFocus} 
          onBlur={handleBlur} 
          disabled={this.props.disabled}
          />
          <div className="ant-input-group-wrap">
            <Button className={btnCls} onClick={handleSubmit} disabled={this.props.disabled}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  }
}

Complete.propTypes = {
  style: PropTypes.any,
  placeholder: PropTypes.string,
  dataSource: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default Complete;