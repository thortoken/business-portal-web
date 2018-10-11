import React from 'react';

export const RouteGuard = allowedRoles => WrappedComponent => {
  return class WithGuard extends React.Component {
    constructor(props, state) {
      super(props, state);
      console.log(state, props);
      this.state = {
        roles: localStorage.getItem('thor-roles') || [],
      };
    }
    render() {
      const { history } = this.props;
      const { roles } = this.state;
      if (allowedRoles.includes(roles)) {
        return <WrappedComponent {...this.props} />;
      } else if(roles.includes('contractor')) {

      } else {
        return <h1>No page for you!</h1>;
      }
    }
  };
};
