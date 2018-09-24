import React from 'react';
import reqwest from 'reqwest';

import { Upload, Icon, Button, Select } from 'antd';

import './Document.css';

export class Document extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    documentType: 'license',
  };

  handleUpload = () => {
    const { fileList, documentType } = this.state;

    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: `/users/${this.getUserId()}/documents?type=${documentType}`,
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

  render() {
    const { uploading, documentType } = this.state;
    const props = {
      action: `/users/${this.getUserId()}/documents?type=${documentType}`,
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
                <Select.Option value="license">Lincese</Select.Option>
                <Select.Option value="idCard">Id Card</Select.Option>
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
          </div>
        </div>
      </div>
    );
  }

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
}

export default Document;
