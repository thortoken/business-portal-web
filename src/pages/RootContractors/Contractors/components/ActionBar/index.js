import React from 'react';
import { Button } from 'antd';
import Modal from '~components/Modal/index';

import AddContractor from '../AddContractor';

import './ActionBar.css';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.modal = React.createRef();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpenModal(event) {
    if (this.modal.current) {
      this.modal.current.open(event);
    }
  }

  handleSubmit() {
    this.modal.current.close();
  }

  render() {
    return (
      <div>
        <div className="ActionBar">
          <Button type="primary" icon="plus" size="default" onClick={this.handleOpenModal}>
            Add contractors
          </Button>
        </div>
        <Modal ref={this.modal} title="Add Contractor">
          <AddContractor onSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export default ActionBar;
