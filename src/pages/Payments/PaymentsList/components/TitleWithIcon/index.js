import React from 'react';
import { Icon } from 'antd';

const TitleWithIcon = ({ title, icon }) => {
  return (
    <span>
      <Icon type={icon} /> {title}
    </span>
  );
};

export default TitleWithIcon;
