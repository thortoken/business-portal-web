import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

import Config from '~services/config';
import './AddDocument.scss';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class AddDocument extends React.Component {
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

  handleUploadAnother = () => {
    this.setState({ showDone: false, files: [] });
  };

  render() {
    const { match, token } = this.props;
    const { showDone, docType } = this.state;
    return (
      <div className="AddDocument">
        <div className="AddDocument__block">
          <Select defaultValue="license" onChange={this.handleChange}>
            <Select.Option value="passport">Passport</Select.Option>
            <Select.Option value="license">License</Select.Option>
            <Select.Option value="idCard">Id Card</Select.Option>
            <Select.Option value="i9">I-9</Select.Option>
            <Select.Option value="w9">W-9</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </div>
        <div className="AddDocument__block">
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
          <div className="AddDocument__button-container">
            <Button
              size="large"
              type="default"
              onClick={this.handleUploadAnother}
              className="AddDocument__button-container--button">
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

export default connect(mapStateToProps, null)(AddDocument);
