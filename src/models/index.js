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
  },
  plugins: [loading],
  redux: {
    reducers: {
      router: routerReducer,
    },
    middlewares: [middleware],
  },
});

store.dispatch.auth.pickToken();

export default store;
