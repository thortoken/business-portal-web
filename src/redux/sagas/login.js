import firebase from 'firebase';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import { call, fork, put, take, takeEvery, all, select } from 'redux-saga/effects';

import {
  types,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  registerSuccess,
  resetLoginFailure,
  registerFailure,
  resetRegisterFailure,
  register,
  syncUser,
  setSale,
} from '../actions/login';

import { saveStatus } from '../actions/status';
import rsf from '../rsf';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

function* loginEmlPwdSaga(action) {
  try {
    //const data = yield call(rsf.auth.signInWithEmailAndPassword, action.email, action.password);
    const data = yield call(rsf.auth.signInWithEmailAndPassword, action.email, action.password);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginResetSaga(action) {
  try {
    const data = yield call(rsf.auth.sendPasswordResetEmail, action.email);
    let msg = {
      message: 'Your password has been reset. Please check your email.',
    };
    yield put(loginFailure(msg));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginTwitterSaga(action) {
  try {
    const data = yield call(rsf.auth.signInWithPopup, twitterAuthProvider);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginGoogleSaga(action) {
  try {
    const data = yield call(rsf.auth.signInWithPopup, googleAuthProvider);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}


function* getSaleStatusSaga(action) {
  try {
    const snapshot = yield call(rsf.firestore.getDocument, `sale/42sZ4kBLofZckKixeDs3`);
    if (snapshot.exists) {
      yield put(setSale(snapshot.data()));
    }
  } catch (error) {
    yield console.log(error);
  }
}

function* loginFailureSaga(action) {
  yield call(delay, 1000);
  yield put(resetLoginFailure());
}

function* logoutSaga() {
  try {
    const data = yield call(rsf.auth.signOut);
    yield put(logoutSuccess(data));
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* syncUserSaga() {
  const channel = yield call(rsf.auth.channel);

  while (true) {
    const { user } = yield take(channel);
    if (user) {
      yield put(syncUser(user));
      const router = yield select(state => state.router);
      if (
        router.location.pathname === '/sign-in' ||
        router.location.pathname === '/register' ||
        router.location.pathname === '/userinfo'
      ) {
        try {
          const snapshot = yield call(rsf.firestore.getDocument, `status/${user.uid}`);
          const userInfo = yield call(rsf.firestore.getDocument, `users/${user.uid}`);
          if (snapshot.exists) {
            yield call(saveStatus, snapshot.data());
            yield put(push('/status'));
          } else if (userInfo.exists) {
            yield put(push('/jumio'));
          } else {
            yield put(push('/userinfo'));
          }
        } catch (error) {
          yield put(logoutFailure(error));
        }
      }
    } else yield put(syncUser(null));
  }
}

function* logoutSuccessSaga(action) {
  yield call(delay, 1000);
  yield put(push('/sign-in'));
}

function* registerEmlPwdSaga(action) {
  try {
    const data = yield call(rsf.auth.createUserWithEmailAndPassword, action.email, action.password);
    yield put(registerSuccess(data));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

function* registerFailureSaga(action) {
  yield call(delay, 1000);
  yield put(resetRegisterFailure());
}

function* testDB() {
  try {
    const snapshot = yield call(rsf.firestore.getCollection, 'users');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

export default function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield all([
    takeEvery(types.LOGIN.REQUEST, loginEmlPwdSaga),
    takeEvery(types.LOGIN.TWITTER, loginTwitterSaga),
    takeEvery(types.LOGIN.GOOGLE, loginGoogleSaga),
    takeEvery(types.LOGOUT.REQUEST, logoutSaga),
    takeEvery(types.LOGOUT.SUCCESS, logoutSuccessSaga),
    takeEvery(types.LOGIN.FAILURE, loginFailureSaga),
    takeEvery(types.TEST, testDB),
    takeEvery(types.GET_SALE, getSaleStatusSaga),
    takeEvery(types.REGISTER.REQUEST, registerEmlPwdSaga),
    takeEvery(types.REGISTER.FAILURE, registerFailureSaga),
    takeEvery(types.RESET_PASSWORD, loginResetSaga),
  ]);
}
