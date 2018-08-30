import { fork, all } from 'redux-saga/effects';

import login from './login';
import jumio from './jumio';
import startup from './startup';
import status from './status';
import wallet from './wallet';

export default function* rootSaga() {
  yield all([fork(login), fork(jumio), fork(startup), fork(status), fork(wallet)]);
}
