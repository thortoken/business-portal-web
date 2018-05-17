import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import rsf from '../rsf';

import {
  types,
  fetchPayments,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
} from '../actions/dashboard';

function* fetchPaymentsFromFirestore() {
  try {
    // const snapshot = yield call(rsf.firestore.getCollection, 'payments');
    const snapshot = yield call(rsf.firestore.syncCollection, 'payments');
    const payments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    yield put(fetchPaymentsSuccess(payments));
  } catch (error) {
    yield put(fetchPaymentsFailure(error));
  }
}

function* setPayments(snapshot) {
    const payments = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    yield put(fetchPaymentsSuccess(payments));
}

export default function* statusRootSaga() {
  yield all([
    // takeEvery(types.FETCH_PAYMENTS.REQUEST, fetchPaymentsFromFirestore),
    fork(rsf.firestore.syncCollection, 'payments', { successActionCreator: setPayments }),
    takeEvery(types.FETCH_PAYMENTS.SUCCESS, fetchPaymentsSuccess),
    takeEvery(types.FETCH_PAYMENTS.FAILURE, fetchPaymentsFailure),
  ]);
}
