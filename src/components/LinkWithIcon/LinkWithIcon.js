import React from 'react';

import { NavLink } from 'react-router-dom';

import './LinkWithIcon.css';

export const Icon = props => (
  <div className="LinkWithIcon-icon">
    <img {...props} />
  </div>
);
export const Label = ({ children }) => <div className="LinkWithIcon-label">{children}</div>;

export default class LinkWithIcon extends React.Component {
  static Icon = Icon;
  static Label = Label;

  render() {
    const { children, className } = this.props;
    const LinkComponent = this.linkComponent();

    return <LinkComponent className={`LinkWithIcon ${className}`}>{children}</LinkComponent>;
  }

  linkComponent = () => {
    const { linkTo, onClick } = this.props;
    if (typeof onClick === 'function') {
      return props => <a href="#" onClick={onClick} {...props} />;
    }
    return props => (
      <NavLink to={linkTo} activeClassName="LinkWithIcon--is-active" exact {...props} />
    );
  };
}
