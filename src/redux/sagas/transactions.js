import { takeEvery, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import rsf, { firestore } from '../rsf';

import {
  types,
  getPendingTransactionsFailure,
  getPendingTransactionsSuccess,
  getPaidTransactionsFailure,
  getPaidTransactionsSuccess,
  getUserTransactionsFailure,
  getUserTransactionsSuccess,
} from '../actions/transactions';
import { collectionTransformer } from './utils';

function* getTransactionsSaga(action) {
  while (true) {
    const task = yield fork(
      rsf.firestore.syncCollection,
      firestore
        .collection('fakeTransactions')
        .where('status', '==', action.params.status)
        .where('date', '>=', new Date(action.params.startDate))
        .where('date', '<', new Date(action.params.endDate)),
      {
        failureActionCreator:
          action.params.status === 'PENDING'
            ? getPendingTransactionsFailure
            : getPaidTransactionsFailure,
        successActionCreator:
          action.params.status === 'PENDING'
            ? getPendingTransactionsSuccess
            : getPaidTransactionsSuccess,
        transform: collectionTransformer,
      }
    );

    yield take(types.GET_TRANSACTIONS.PAUSE);
    yield cancel(task);
  }
}

function* getUserTransactionsSaga(action) {
  while (true) {
    const task = yield fork(
      rsf.firestore.syncCollection,
      firestore
        .collection('fakeTransactions')
        .where('contractor.id', '==', action.params.userId)
        .where('status', '==', action.params.status)
        .where('date', '>=', new Date(action.params.startDate))
        .where('date', '<', new Date(action.params.endDate)),
      {
        failureActionCreator: getUserTransactionsFailure,
        successActionCreator: getUserTransactionsSuccess,
        transform: collectionTransformer,
      }
    );

    yield take(types.GET_USER_TRANSACTIONS.PAUSE);
    yield cancel(task);
  }
}

export default function* transactionsRootSaga() {
  yield takeEvery(types.GET_TRANSACTIONS.REQUEST, getTransactionsSaga);
  yield takeEvery(types.GET_USER_TRANSACTIONS.REQUEST, getUserTransactionsSaga);
}
