import React from 'react';

export const RouteGuard = allowedRoles => WrappedComponent => {
  return class WithGuard extends React.Component {
    constructor(props, state) {
      super(props, state);
      this.state = {
        roles: localStorage.getItem('thor-roles') || [],
      };
    }

    UNSAFE_componentWillMount() {
      const { history } = this.props;
      const { roles } = this.state;
      if (!allowedRoles.includes(roles) && roles.includes('contractor')) {
        history.push('/contractor');
      }
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
