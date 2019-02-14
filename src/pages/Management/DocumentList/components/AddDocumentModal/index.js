import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

import Config from '~services/config';
import './AddDocumentModal.scss';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class AddDocumentModal extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    onChangeVisibility: PropTypes.func.isRequired,
  };

  state = {
    files: [],
  };

  handleModalCancel = () => {
    const { onChangeVisibility } = this.props;
    onChangeVisibility(false);
  };

  render() {
    const { token, isModalVisible, onChangeVisibility } = this.props;
    return (
      <Modal
        title="Add a document"
        visible={isModalVisible}
        footer={null}
        onCancel={this.handleModalCancel}
        destroyOnClose>
        <div className="AddDocumentModal">
          <div className="AddDocumentModal__block">
            <FilePond
              allowFileSizeValidation
              allowFileTypeValidation
              maxFileSize="10MB"
              acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
              labelTapToCancel="Click to cancel."
              labelTapToRetry="Click to retry."
              labelTapToUndo="Click to undo."
              server={{
                url: `${Config.apiUrl}documents`,
                process: {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  onload: response => {
                    onChangeVisibility(false, true);
                  },
                  onerror: response => {},
                },
              }}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddDocumentModal;
