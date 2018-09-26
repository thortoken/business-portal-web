import React from 'react';
import { connect } from 'react-redux';
import reqwest from 'reqwest';
import { renderLongDate } from '~utils/time';

import { Upload, Icon, Button, Select } from 'antd';

import './Document.css';

export class Document extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    documentType: 'license',
  };

  componentDidMount() {
    this.handleUpdateUserFilesList();
  }

  render() {
    const { userDocuments } = this.props;
    const { uploading, documentType } = this.state;
    const props = {
      action: `https://odin-api.prod.gothor.com/demo/users/${this.getUserId()}/documents?type=${documentType}&tenant=7bc0447a-ea99-4ba2-93bb-c84f5b325c50`,
      contentType: 'multipart/form-data',
      enctype: 'multipart/form-data',
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div className="Document">
        <div className="Document__register">
          <div className="Document__msg">Upload Document</div>
          <div className="Document__form">
            <div className="Document__type-dropdown">
              <Select defaultValue="license" style={{ width: 120 }} onChange={this.handleChange}>
                <Select.Option value="passport">Passport</Select.Option>
                <Select.Option value="license">License</Select.Option>
                <Select.Option value="idCard">Id Card</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </div>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Select Files
              </Button>
            </Upload>
            <div className="Document__upload-btn">
              <Button
                className="upload-demo-start"
                type="primary"
                onClick={this.handleUpload}
                disabled={this.state.fileList.length === 0}
                loading={uploading}>
                {uploading ? 'Uploading' : 'Start Upload'}
              </Button>
            </div>
            <div className="Document__files-list">
              {userDocuments.length > 0 ? 'User files list:' : ''}
              <ol>
                {userDocuments.map((item, index) => {
                  return (
                    <li key={index}>
                      Created at: {renderLongDate(item.created)}, status: {item.status}, type:{' '}
                      {item.type}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleUpload = () => {
    const { fileList, documentType } = this.state;

    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: `https://odin-api.prod.gothor.com/demo/users/${this.getUserId()}/documents?type=${documentType}&tenant=7bc0447a-ea99-4ba2-93bb-c84f5b325c50`,
      method: 'post',
      contentType: 'multipart/form-data',
      enctype: 'multipart/form-data',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        // message.success('upload successfully.');
        console.log('upload successfully.');
        this.handleUpdateUserFilesList();
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        // message.error('upload failed.');
        console.log('upload failed.');
      },
    });
  };

  handleChange = value => {
    this.setState({
      documentType: value,
    });
  };

  getUserId = () => {
    const { location } = this.props;
    const usp = new URLSearchParams(location.search);

    return usp.get('id');
  };

  handleUpdateUserFilesList = () => {
    const { getUserDocuments } = this.props;
    const { location } = this.props;
    const usp = new URLSearchParams(location.search);

    getUserDocuments({ id: usp.get('id') });
  };
}

const mapStateToProps = state => ({
  userDocuments: state.users.userDocuments,
});

const mapDispatchToProps = dispatch => ({
  getUserDocuments: dispatch.users.getUserDocuments,
});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
