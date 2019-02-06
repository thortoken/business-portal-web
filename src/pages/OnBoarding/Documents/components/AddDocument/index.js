import React from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import Config from '~services/config';
import './AddDocument.scss';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

export class Documents extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    changeStep: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = {
    files: [],
  };

  render() {
    const { token, changeStep, type } = this.props;
    const { files } = this.state;
    return (
      <div className="Documents">
        <div className="Documents__block">
          <FilePond
            files={files}
            allowFileSizeValidation
            allowFileTypeValidation
            maxFileSize="10MB"
            acceptedFileTypes={['application/pdf', 'image/jpg', 'image/jpeg', 'image/png']}
            labelTapToCancel="Click to cancel."
            labelTapToRetry="Click to retry."
            labelTapToUndo="Click to undo."
            onupdatefiles={fileItems => {
              this.setState({
                files: fileItems.map(fileItem => fileItem.file),
              });
            }}
            server={{
              url: `${Config.apiUrl}documents?type=${type}`,
              process: {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                onload: response => {
                  this.setState({ files: [] });
                  changeStep(true);
                },
                onerror: response => {},
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default Documents;
