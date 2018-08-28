import React from 'react';

import Modal from './Modal';

const withRouteModal = ({ component: Component, ...modalProps }) => {
  const HOC = props => {
    const closeCallback = () => props.history.goBack();

    return (
      <Modal onClose={closeCallback} {...modalProps}>
        <Component onClose={closeCallback} {...props} />
      </Modal>
    );
  };
  const displayName = Component.displayName || Component.name || '';
  HOC.displayName = `withRouteModal(${displayName}`;
  return HOC;
};

export default withRouteModal;
