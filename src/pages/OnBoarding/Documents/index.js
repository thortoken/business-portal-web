import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import Config from '~services/config';
import './Documents.scss';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class Documents extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    user: PropTypes.object,
  };

  state = {
    showDone: false,
    docType: 'license',
  };

  handleClose = () => {
    const { history, user } = this.props;
    history.push(`/contractors/${user.id}/documents`);
  };

  handleChange = value => {
    this.setState({ docType: value });
  };

  render() {
    const { user, token } = this.props;
    const { showDone, docType } = this.state;
    return (
      <div className="Documents">
        <div className="Documents__block">
          <Select defaultValue="license" onChange={this.handleChange}>
            <Select.Option value="passport">Passport</Select.Option>
            <Select.Option value="license">License</Select.Option>
            <Select.Option value="idCard">Id Card</Select.Option>
            <Select.Option value="i9">I-9</Select.Option>
            <Select.Option value="w9">W-9</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </div>
        <div className="Documents__block">
          <FilePond
            allowFileSizeValidation
            maxFileSize="10MB"
            allowFileTypeValidation
            acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            server={{
              url: `${Config.apiUrl}users/${user.id}/documents?type=${docType}`,
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
          <div className="Documents__button-container">
            <Button
              size="large"
              type="default"
              onClick={this.handleClose}
              className="Documents__button-container--button">
              Close
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(Documents);
