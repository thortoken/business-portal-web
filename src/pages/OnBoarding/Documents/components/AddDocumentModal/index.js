import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

import Config from '~services/config';
import './AddDocument.scss';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class Documents extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isModalVisible: PropTypes.bool.isRequired,
    onChangeVisibility: PropTypes.func.isRequired,
  };

  state = {
    docType: 'w9',
  };

  handleModalCancel = () => {
    const { onChangeVisibility } = this.props;
    onChangeVisibility(false);
  };

  handleChange = value => {
    this.setState({ docType: value });
  };

  render() {
    const { token, isModalVisible, onChangeVisibility } = this.props;
    const { docType } = this.state;
    return (
      <Modal
        title="Add a document"
        visible={isModalVisible}
        footer={null}
        onCancel={this.handleModalCancel}
        destroyOnClose>
        <div className="AddDocument">
          <div className="AddDocument__block">
            <Select defaultValue="w9" onChange={this.handleChange}>
              <Select.Option value="w9">W-9</Select.Option>
              <Select.Option value="passport">Passport</Select.Option>
              <Select.Option value="license">License</Select.Option>
              <Select.Option value="idCard">Id Card</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </div>
          <div className="AddDocument__block">
            <FilePond
              allowFileSizeValidation
              allowFileTypeValidation
              maxFileSize="10MB"
              acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
              labelTapToCancel="Click to cancel."
              labelTapToRetry="Click to retry."
              labelTapToUndo="Click to undo."
              server={{
                url: `${Config.apiUrl}documents?type=${docType}`,
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

export default Documents;
