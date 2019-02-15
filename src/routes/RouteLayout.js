import React from 'react';
import { Layout } from 'antd';
import Topbar from '~components/Topbar';

export const RouteLayout = (routeClass, type) => WrappedComponent => {
  return class WithGuard extends React.Component {
    render() {
      return (
        <Layout className="AdminRoutes">
          <Topbar className="AdminRoutes-nav" type={type} />
          <Layout.Content className={routeClass}>
            <WrappedComponent {...this.props} />
          </Layout.Content>
        </Layout>
      );
    }
  };
};

export default RouteLayout;
