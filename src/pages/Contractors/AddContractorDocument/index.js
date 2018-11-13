import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import './AddContractorDocument.scss';
import Config from '~services/config';
import { Button, Select } from 'antd';

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
  };

  handleClose = () => {
    const { history, match } = this.props;
    history.push(`/contractors/${match.params.id}/documents`);
  };

  handleChange = value => {
    this.setState({ docType: value });
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
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </div>
        <div className="AddContractorDocument__block">
          <FilePond
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
              onClick={this.handleClose}
              className="AddContractorDocument__button-container--button">
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

export default connect(mapStateToProps, null)(AddContractorDocument);
