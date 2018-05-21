import React from 'react';

import Box from '~components/Box';

import './Card.css';

export default class Card extends React.Component {
  static defaultProps = {
    color: 'white',
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
