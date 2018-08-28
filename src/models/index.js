import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import auth from './auth';
import jobs from './jobs';
import transactions from './transactions';
import users from './users';

export const history = createHistory();
const middleware = routerMiddleware(history);

const loading = createLoadingPlugin();

const store = init({
  models: {
    auth,
    jobs,
    transactions,
    users,
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
