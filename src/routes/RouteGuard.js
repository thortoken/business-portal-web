import React from 'react';

export const RouteGuard = allowedRoles => WrappedComponent => {
  return class WithGuard extends React.Component {
    constructor(props, state) {
      super(props, state);
      this.state = {
        roles: localStorage.getItem('thor-roles') || [],
      };
    }

    render() {
      const { roles } = this.state;
      if (allowedRoles.includes(roles)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <h1>No page for you!</h1>;
      }
    }
  };
};

export const Admin = RouteGuard(['admin']);
export const Contractor = RouteGuard(['admin', 'contractor']);
