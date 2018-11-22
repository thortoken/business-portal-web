import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './UploadInviteContractor.scss';
import Config from '~services/config';
import { Button } from 'antd';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class UploadInviteContractor extends React.Component {
  static propTypes = {
    token: PropTypes.string,
  };

  state = {
    showDone: false,
  };

  handleClose = () => {
    const { history } = this.props;
    history.push(`/contractors/invitationsList`);
  };

  render() {
    const { token } = this.props;
    const { showDone } = this.state;
    return (
      <div className="UploadInviteContractor">
        <div className="UploadInviteContractor__block">
          <FilePond
            allowFileSizeValidation
            maxFileSize="10MB"
            allowFileTypeValidation
            acceptedFileTypes={['application/csv', 'text/csv']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            server={{
              url: `${Config.apiUrl}contractors/invitations/import`,
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
          <div className="UploadInviteContractor__button-container">
            <Button
              size="large"
              type="default"
              onClick={this.handleClose}
              className="UploadInviteContractor__button-container--button">
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

export default connect(mapStateToProps, null)(UploadInviteContractor);
