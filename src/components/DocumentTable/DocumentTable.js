import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import classnames from 'classnames';

import Box from '~components/Box/index';
import { renderRegularDate } from '~utils/time';
import './DocumentTable.scss';

const { Column } = Table;

class DocumentTable extends React.Component {
  static propTypes = {
    handleTableChange: PropTypes.func.isRequired,
    documents: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    renderActions: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  };

  render() {
    const { documents, isLoading, pagination, renderActions } = this.props;
    return (
      <div className="DocumentTable">
        <Box>
          <Table
            dataSource={documents}
            className="DocumentTable__table"
            rowKey="documentId"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="center"
              dataIndex="name"
              title="Name"
              render={text => {
                return <div className="DocumentTable__name">{text}</div>;
              }}
            />
            <Column
              align="center"
              dataIndex="isRequired"
              title="Type"
              render={text => {
                return (
                  <div className="DocumentTable__isRequired">{text ? 'required' : 'optional'}</div>
                );
              }}
            />
            <Column
              align="center"
              dataIndex="createdAt"
              title="Added On"
              render={text => text && renderRegularDate(text)}
            />
            <Column
              align="center"
              dataIndex="status"
              title="Status"
              render={text => {
                return (
                  <div
                    className={classnames('DocumentList__status', {
                      'DocumentTable__status--pending': text === 'pending',
                      'DocumentTable__status--approved': text === 'approved',
                      'DocumentTable__status--rejected': text === 'rejected',
                    })}>
                    {text}
                  </div>
                );
              }}
            />
            <Column align="center" title="Actions" render={renderActions} />
          </Table>
        </Box>
      </div>
    );
  }
}

export default DocumentTable;
