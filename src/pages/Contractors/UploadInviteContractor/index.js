import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './UploadInviteContractor.scss';
import Config from '~services/config';
import { Button, Icon, List, Popover } from 'antd';
import NotificationService from '~services/notification';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class UploadInviteContractor extends React.Component {
  static propTypes = {
    token: PropTypes.string,
  };

  state = {
    showDone: false,
    showError: false,
    errorList: [],
    errorStatus: '',
  };

  handleClose = () => {
    const { history } = this.props;
    history.push(`/contractors/invitationsList`);
  };

  render() {
    const { token } = this.props;
    const { showDone, showError, errorList, errorStatus } = this.state;
    return (
      <div className="UploadInviteContractor">
        <div className="UploadInviteContractor__block">
          <small>
            File hint:{' '}
            <Popover
              placement="rightTop"
              content={
                'Import file have to have two columns - email and externalId, ' +
                'separated by semicolon.'
              }
              title="File Hints">
              <Icon type="exclamation-circle" theme="twoTone" />
            </Popover>
          </small>

          <FilePond
            allowFileSizeValidation
            maxFileSize="10MB"
            allowFileTypeValidation
            acceptedFileTypes={['application/csv', 'text/csv']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            onupdatefiles={file => {
              this.setState({ showError: false });
            }}
            onpreparefile={file => {
              this.setState({ showError: false });
            }}
            server={{
              url: `${Config.apiUrl}contractors/invitations/import`,
              process: {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                onload: response => {
                  this.setState({ showDone: true, showError: false });
                },
                onerror: async response => {
                  const data = await JSON.parse(response);
                  let error = data.error.status ? data.error.status : data.error;
                  NotificationService.open({
                    type: 'error',
                    message: 'Error',
                    description: error,
                  });
                  this.setState({
                    showDone: true,
                    showError: !!data.error.status,
                    errorList: data.error.items,
                    errorStatus: data.error.status,
                  });
                },
              },
            }}
          />
          {showError && (
            <List
              size="small"
              header={<div className="UploadInviteContractor__header">{errorStatus}</div>}
              bordered
              dataSource={errorList}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          )}
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
