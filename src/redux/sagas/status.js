import firebase from 'firebase';
import { push } from 'react-router-redux';
import { delay } from 'redux-saga';
import { call, fork, put, take, takeEvery, all, select, race } from 'redux-saga/effects';
import { types, submitInfoSuccess, submitInfoFailure, saveStatus } from '../actions/status';
import { types as loginTypes } from '../actions/login';
import rsf from '../rsf';

function* submitInfo(action) {
  let login = yield select(state => state.login);
  try {
    const userInfo = yield call(rsf.firestore.setDocument, `users/${login.user.uid}`, action.info);
    yield put(submitInfoSuccess());
  } catch (error) {
    yield put(submitInfoFailure(error));
  }
}

function* submitInfoSuccessSaga(action) {
  yield put(push('/jumio'));
}

function* resetKYCSaga() {
  let login = yield select(state => state.login);
  try {
    const jumio = yield call(rsf.firestore.deleteDocument, `jumio/${login.user.uid}`);
    const comply = yield call(rsf.firestore.deleteDocument, `comply/${login.user.uid}`);
    const status = yield call(rsf.firestore.deleteDocument, `status/${login.user.uid}`);
    yield put(push('/jumio'));
  } catch (error) {
    console.log(error);
  }
}

function* getStatusSaga(action) {
  let login = yield select(state => state.login);

  if (!login.user) {
    let { sync } = yield race({
      sync: take(loginTypes.SYNC_USER),
      timeout: call(delay, 5000),
    });

    if (sync.user) {
      const userStatus = yield call(rsf.firestore.getDocument, `status/${sync.user.uid}`);
      const userInfo = yield call(rsf.firestore.getDocument, `users/${sync.user.uid}`);
      let meow = userStatus.data(),
        user = userInfo.data();
      meow.neo_wallet = user.neo_wallet;
      yield put(saveStatus(meow));
    } else {
      yield put(push('/sign-in'));
    }
  } else {
    const userStatus = yield call(rsf.firestore.getDocument, `status/${login.user.uid}`);
    const userInfo = yield call(rsf.firestore.getDocument, `users/${login.user.uid}`);
    let meow = userStatus.data(),
      user = userInfo.data();
    meow.neo_wallet = user.neo_wallet;
    yield put(saveStatus(meow));
  }
}

function* updateNeoAddressSaga(action) {
  let login = yield select(state => state.login);
  try {
    const userInfo = yield call(
      rsf.firestore.updateDocument,
      `users/${login.user.uid}`,
      'neo_wallet',
      action.neo_wallet
    );
    let status = yield select(state => state.status.info);
    status.neo_wallet = action.neo_wallet;
    yield put(saveStatus(status));
  } catch (error) {
    console.log(error);
  }
}

export default function* statusRootSaga() {
  yield all([
    takeEvery(types.SUBMIT_INFO.REQUEST, submitInfo),
    takeEvery(types.SUBMIT_INFO.SUCCESS, submitInfoSuccessSaga),
    takeEvery(types.GET_STATUS, getStatusSaga),
    takeEvery(types.RESET_KYC, resetKYCSaga),
    takeEvery(types.UPDATE_NEO_ADDRESS, updateNeoAddressSaga),
  ]);
}
