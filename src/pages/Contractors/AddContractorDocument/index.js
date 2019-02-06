import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { Button, Select } from 'antd';

import Config from '~services/config';
import './AddContractorDocument.scss';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class AddContractorDocument extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    showDone: false,
    docType: 'license',
    files: [],
  };

  handleChange = value => {
    this.setState({ docType: value });
  };

  handleUploadAnother = value => {
    this.setState({ showDone: false, files: [] });
  };

  render() {
    const { match, token } = this.props;
    const { showDone, docType } = this.state;
    return (
      <div className="AddContractorDocument">
        <div className="AddContractorDocument__block">
          <Select defaultValue="license" onChange={this.handleChange}>
            <Select.Option value="passport">Passport</Select.Option>
            <Select.Option value="license">License</Select.Option>
            <Select.Option value="idCard">Id Card</Select.Option>
            <Select.Option value="i9">I-9</Select.Option>
            <Select.Option value="w9">W-9</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </div>
        <div className="AddContractorDocument__block">
          <FilePond
            files={this.state.files}
            allowFileSizeValidation
            allowFileTypeValidation
            maxFileSize="10MB"
            acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            instantUpload={false}
            onupdatefiles={fileItems => {
              this.setState({
                files: fileItems.map(fileItem => fileItem.file),
              });
            }}
            server={{
              url: `${Config.apiUrl}users/${match.params.id}/documents?type=${docType}`,
              process: {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                onload: response => {
                  this.setState({ showDone: true });
                },
                onerror: response => {
                  this.setState({ showDone: true });
                },
              },
            }}
          />
        </div>
        {showDone && (
          <div className="AddContractorDocument__button-container">
            <Button
              size="large"
              type="default"
              onClick={this.handleUploadAnother}
              className="AddContractorDocument__button-container--button">
              Upload Another
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(AddContractorDocument);
