import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import loginReducer from './reducers/login';
import jumioReducer from './reducers/jumio';
import sagas from './sagas';
import statusReducer from './reducers/status';
// import dashboardReducer from './reducers/dashboard';

const sagaMiddleware = createSagaMiddleware();

const allReducers = combineReducers({
  login: loginReducer,
  jumio: jumioReducer,
  status: statusReducer,
  // dashboard: dashboardReducer,
});

const store = createStore(
  //combine all reducers here
  allReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = allReducers.default;
    store.replaceReducer(nextRootReducer);
  });
}

sagaMiddleware.run(sagas);

export default store;
