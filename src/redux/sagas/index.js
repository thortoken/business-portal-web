import { fork, all } from 'redux-saga/effects';

import login from './login';
import jobs from './jobs';
import jumio from './jumio';
import startup from './startup';
import status from './status';
import transactions from './transactions';
import wallet from './wallet';

export default function* rootSaga() {
  yield all([
    fork(login),
    fork(jobs),
    fork(jumio),
    fork(startup),
    fork(status),
    fork(transactions),
    fork(wallet),
  ]);
}
