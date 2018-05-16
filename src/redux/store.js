import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import loginReducer from './reducers/login';
import jumioReducer from './reducers/jumio';
import sagas from './sagas';
import statusReducer from './reducers/status';

const sagaMiddleware = createSagaMiddleware();

const routerMiddlewareInit = routerMiddleware(history);

const allReducers = combineReducers({
  login: loginReducer,
  jumio: jumioReducer,
  router: routerReducer,
  status: statusReducer,
});

const store = createStore(
  //combine all reducers here
  allReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddlewareInit))
);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = allReducers.default;
    store.replaceReducer(nextRootReducer);
  });
}

sagaMiddleware.run(sagas);

export default store;
