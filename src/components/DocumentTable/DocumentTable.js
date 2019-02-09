import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import Box from '~components/Box/index';
import { renderRegularDate } from '~utils/time';
import './DocumentTable.scss';

const { Column } = Table;

class DocumentTable extends React.Component {
  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
    handleTableChange: PropTypes.func.isRequired,
    documents: PropTypes.arrayOf(PropTypes.object),
    pagination: PropTypes.object,
    isLoading: PropTypes.bool,
    renderActions: PropTypes.element,
  };

  render() {
    const { documents, isLoading, pagination, renderActions } = this.props;
    return (
      <div className="DocumentTable">
        <Box>
          <Table
            dataSource={documents}
            className="DocumentTable__table"
            rowKey="created"
            onChange={this.handleTableChange}
            pagination={pagination}
            loading={isLoading}>
            <Column
              align="left"
              dataIndex="name"
              title="Name"
              render={text => {
                return <div className="DocumentTable__name">{text}</div>;
              }}
            />
            <Column
              align="left"
              dataIndex="type"
              title="Type"
              render={text => {
                return <div className="DocumentTable__type">{text}</div>;
              }}
            />
            <Column
              align="center"
              dataIndex="created"
              title="Added On"
              render={renderRegularDate}
            />
            <Column align="center" title="Actions" render={renderActions} />
          </Table>
        </Box>
      </div>
    );
  }
}

export default DocumentTable;
