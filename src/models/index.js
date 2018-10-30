import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import auth from './auth';
import jobs from './jobs';
import transactions from './transactions';
import users from './users';
import tenants from './tenants';
import payments from './payments';
import invitations from './invitations';
import onBoarding from './onBoarding';
import tenantCompany from './tenantCompany';
import beneficialOwners from './beneficialOwners';

export const history = createHistory();
const middleware = routerMiddleware(history);

const loading = createLoadingPlugin();

const store = init({
  models: {
    auth,
    jobs,
    transactions,
    users,
    tenants,
    payments,
    invitations,
    onBoarding,
    tenantCompany,
    beneficialOwners,
  },
  plugins: [loading],
  redux: {
    reducers: {
      router: routerReducer,
    },
    middlewares: [middleware],
  },
});

// change to one call
store.dispatch.auth.pickRoles();
store.dispatch.auth.pickToken();

export default store;
