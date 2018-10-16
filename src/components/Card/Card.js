import React from 'react';
import PropTypes from 'prop-types';

import Box from '~components/Box';

import './Card.scss';

export class Card extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    color: PropTypes.oneOf(['black', 'blue', 'green']).isRequired,
    description: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    rounded: PropTypes.bool,
    title: PropTypes.string,
  };

  render() {
    const { children, icon, title, description, rounded, color } = this.props;

    const Container = rounded ? Box : 'div';
    return (
      <Container className={`Card Card--${color}`}>
        <div className="Card-content">
          <div className="Card-icon">{icon}</div>
          <div className="Card-text">
            <div className="Card-title">{title}</div>
            <div className="Card-description">{description}</div>
          </div>
        </div>
        <div className="Card-actions">{children}</div>
      </Container>
    );
  }
}

export default Card;
