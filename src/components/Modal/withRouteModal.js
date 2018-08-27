import React from 'react';

import Modal from './Modal';

const withRouteModal = ({ component: Component, ...modalProps }) => {
  const HOC = props => (
    <Modal {...modalProps} onClose={() => props.history.goBack()}>
      <Component {...props} />
    </Modal>
  );
  const displayName = Component.displayName || Component.name || '';
  HOC.displayName = `withRouteModal(${displayName}`;
  return HOC;
};

export default withRouteModal;
