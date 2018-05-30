import { takeEvery, fork, select } from 'redux-saga/effects';
import rsf, { firestore } from '../rsf';

import {
  types,
  syncWalletSuccess,
  syncWalletFailure,
  syncExchangeRatesFailure,
  syncExchangeRatesSuccess,
} from '../actions/wallet';
import { documentTransformer, collectionTransformer } from './utils';

function* syncExchangeRatesSaga() {
  yield fork(
    rsf.firestore.syncCollection,
    firestore
      .collection('exchangeRates')
      .orderBy('date', 'desc')
      .limit(1),
    {
      failureActionCreator: syncExchangeRatesFailure,
      successActionCreator: syncExchangeRatesSuccess,
      transform: collectionTransformer,
    }
  );
}

function* syncWalletSaga() {
  const { user } = yield select(state => state.login);

  yield fork(rsf.firestore.syncDocument, `wallets/${user.uid}`, {
    failureActionCreator: syncWalletFailure,
    successActionCreator: syncWalletSuccess,
    transform: documentTransformer,
  });
}

export default function* walletRootSaga() {
  yield takeEvery(types.SYNC_WALLET.REQUEST, syncWalletSaga);
  yield takeEvery(types.SYNC_EXCHANGE_RATES.REQUEST, syncExchangeRatesSaga);
}
