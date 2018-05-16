import axios from 'axios';
import { call, fork, put, take, takeEvery, all, select } from 'redux-saga/effects';
import { types, getTokenSuccess, getTokenFailure } from '../actions/jumio';
import { types as loginTypes } from '../actions/login';
// import { credentials } from '../../credentials';
import { generateId } from '../../utilities';

function* getToken(action) {
  let login = yield select(state => state.login);
  if (!(login.user && login.user.uid)) {
    yield take(loginTypes.SYNC_USER);
    login = yield select(state => state.login);
  }
  var params = {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  };
  let id = generateId();
  try {
    const data = yield call(
      axios.post,
      'https://us-central1-thor-whitelist.cloudfunctions.net/jumio?' +
        `token=a808a56b-9732-4260-bdca-913851b90b10&userId=${login.user.uid}` +
        `&merchantId=${id}`,
      params
    );
    yield put(getTokenSuccess(data));
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

export default function* jumioRootSaga() {
  yield all([takeEvery(types.JUMIO.REQUEST, getToken)]);
}
