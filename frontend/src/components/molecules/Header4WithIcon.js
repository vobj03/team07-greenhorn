import React, { Component } from 'react';
import { Col, Icon } from 'antd';

export class Header4WithIcon extends Component {
  render() {
    const { iconType, values, ...rest } = this.props;
    return (
      <h4>
        <Icon
          type={iconType}
          style={{ color: 'rgba(0,0,0,.25)', margin: '5px' }}
        />
        {values}
      </h4>
    );
  }
}
