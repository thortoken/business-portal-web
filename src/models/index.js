import { init } from '@rematch/core'
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import auth from './auth'

export const history = createHistory();
const middleware = routerMiddleware(history);

const store = init({
  models: {
    auth,
  },
  redux: {
    reducers: {
      router: routerReducer
    },
    middlewares: [middleware]
  }
});

store.dispatch.auth.pickToken();

export default store;
