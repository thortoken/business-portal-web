import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import rsf from '../rsf';

import {
  types,
  // getPaymentsSuccess,
  // getPaymentsFailure,
  syncPaymentsSuccess,
  syncPaymentsFailure,
} from '../actions/dashboard';
import { collectionTransformer } from './utils';

// function* getPaymentsSaga() {
//   try {
//     const snapshot = yield call(rsf.firestore.getCollection, 'payments');
//     const payments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
//     yield put(getPaymentsSuccess(payments));
//   } catch (error) {
//     yield put(getPaymentsFailure(error));
//   }
// }

function* syncPaymentsSaga() {
  yield fork(rsf.firestore.syncCollection, 'payments', {
    failureActionCreator: syncPaymentsFailure,
    successActionCreator: syncPaymentsSuccess,
    transform: collectionTransformer,
  });
}

export default function* dashboardRootSaga() {
  yield takeEvery(types.SYNC_PAYMENTS.REQUEST, syncPaymentsSaga);
  // yield takeEvery(types.GET_PAYMENTS.REQUEST, getPaymentsSaga);
}
