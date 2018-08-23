import { init } from '@rematch/core';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import auth from './auth';
import jobs from './jobs';
import transactions from './transactions';

export const history = createHistory();
const middleware = routerMiddleware(history);

const store = init({
  models: {
    auth,
    jobs,
    transactions,
  },
  redux: {
    reducers: {
      router: routerReducer,
    },
    middlewares: [middleware],
  },
});

store.dispatch.auth.pickToken();

export default store;
