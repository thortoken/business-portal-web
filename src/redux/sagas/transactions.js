import { takeLatest, call, select, put } from 'redux-saga/effects';
import rsf, { firestore } from '../rsf';

import { types, getTransactionsSuccess, getTransactionsFailure } from '../actions/transactions';
import { collectionTransformer, paginateQuery } from './utils';

const queryForDirection = (query, direction, userId) => {
  switch (direction) {
    case 'revenue':
      return query.where('from.userId', '==', userId);
    case 'payments':
      return query.where('to.userId', '==', userId);
    default:
      return query.where(`usersInvolved.${userId}`, '==', true);
  }
};

function* getTransactionsSaga(options) {
  const userId = yield select(state => state.login.user.uid);
  console.log({
    userId,
    options,
    startAfter: options.limit * (options.page - 1),
  });

  let query = paginateQuery(firestore.collection('transactions'), options);
  query = queryForDirection(query, options.direction, userId);
  console.log('query', query);

  try {
    const snapshot = yield call(rsf.firestore.getCollection, query);
    console.log('snapshot', snapshot);
    const payments = collectionTransformer(snapshot);
    console.log('payments', payments);
    yield put(getTransactionsSuccess(payments, options));
  } catch (error) {
    yield put(getTransactionsFailure(error, options));
  }
}
export default function* transactionsRootSaga() {
  yield takeLatest(types.GET_TRANSACTIONS.REQUEST, getTransactionsSaga);
}
