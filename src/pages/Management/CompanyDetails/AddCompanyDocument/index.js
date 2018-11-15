import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './AddCompanyDocument.scss';
import Config from '~services/config';
import { Button, Select } from 'antd';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class AddCompanyDocument extends React.Component {
  static propTypes = {
    token: PropTypes.string,
  };

  state = {
    showDone: false,
    docType: 'license',
  };

  handleClose = () => {
    const { history } = this.props;
    history.push(`/management/company-details/documents`);
  };

  handleChange = value => {
    this.setState({ docType: value });
  };

  render() {
    const { token } = this.props;
    const { showDone, docType } = this.state;
    return (
      <div className="AddCompanyDocument">
        <div className="AddCompanyDocument__block">
          <Select defaultValue="license" onChange={this.handleChange}>
            <Select.Option value="passport">Passport</Select.Option>
            <Select.Option value="license">License</Select.Option>
            <Select.Option value="idCard">Id Card</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </div>
        <div className="AddCompanyDocument__block">
          <FilePond
            allowFileSizeValidation
            maxFileSize="10MB"
            allowFileTypeValidation
            acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            server={{
              url: `${Config.apiUrl}tenants/company/documents?type=${docType}`,
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
          <div className="AddCompanyDocument__button-container">
            <Button
              size="large"
              type="default"
              onClick={this.handleClose}
              className="AddCompanyDocument__button-container--button">
              Close
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

export default connect(mapStateToProps, null)(AddCompanyDocument);
