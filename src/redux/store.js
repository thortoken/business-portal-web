import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import loginReducer from './reducers/login';
import jumioReducer from './reducers/jumio';
import sagas from './sagas';
import statusReducer from './reducers/status';
import dashboardReducer from './reducers/dashboard';
import walletReducer from './reducers/wallet';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const allReducers = combineReducers({
  login: loginReducer,
  jumio: jumioReducer,
  status: statusReducer,
  router: routerReducer,
  dashboard: dashboardReducer,
  wallet: walletReducer,
});

const store = createStore(
  //combine all reducers here
  allReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = allReducers.default;
    store.replaceReducer(nextRootReducer);
  });
}

sagaMiddleware.run(sagas);

export default store;
