import { takeEvery, fork } from 'redux-saga/effects';
import rsf, { firestore } from '../rsf';

import { types, syncTransactionsSuccess, syncTransactionsFailure } from '../actions/transactions';
import { collectionTransformer } from './utils';

// function* getTransactionsSaga() {
//   try {
//     const snapshot = yield call(rsf.firestore.getCollection, 'payments');
//     const payments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
//     yield put(getTransactionsSuccess(payments));
//   } catch (error) {
//     yield put(getTransactionsFailure(error));
//   }
// }

function* syncTransactionsSaga() {
  yield fork(rsf.firestore.syncCollection, firestore.collection('transactions').limit(5), {
    failureActionCreator: syncTransactionsFailure,
    successActionCreator: syncTransactionsSuccess,
    transform: collectionTransformer,
  });
}

export default function* transactionsRootSaga() {
  yield takeEvery(types.SYNC_TRANSACTIONS.REQUEST, syncTransactionsSaga);
  // yield takeEvery(types.GET_TRANSACTIONS.REQUEST, getTransactionsSaga);
}
