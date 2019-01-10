import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import './AddDwollaDocument.scss';
import Config from '~services/config';
import { Button, Select } from 'antd';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class AddDwollaDocument extends React.Component {
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
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}`);
  };

  handleChange = value => {
    this.setState({ docType: value });
  };

  render() {
    const { match, token } = this.props;
    const { showDone, docType } = this.state;
    return (
      <div className="AddDwollaDocument">
        <div className="AddDwollaDocument__block">
          <Select defaultValue="license" onChange={this.handleChange}>
            <Select.Option value="passport">Passport</Select.Option>
            <Select.Option value="license">License</Select.Option>
            <Select.Option value="idCard">Id Card</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </div>
        <div className="AddDwollaDocument__block">
          <FilePond
            allowFileSizeValidation
            maxFileSize="10MB"
            allowFileTypeValidation
            acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            server={{
              url: `${Config.apiUrl}users/${match.params.id}/documents/dwolla?type=${docType}`,
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
          <div className="AddDwollaDocument__button-container">
            <Button
              size="large"
              type="default"
              onClick={this.handleClose}
              className="AddDwollaDocument__button-container--button">
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

export default connect(mapStateToProps, null)(AddDwollaDocument);
