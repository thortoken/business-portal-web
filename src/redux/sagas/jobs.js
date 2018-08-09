import { takeEvery, fork, take, cancel } from 'redux-saga/effects';
import rsf, { firestore } from '../rsf';

import { types, getJobsFailure, getJobsSuccess } from '../actions/jobs';
import { collectionTransformer } from './utils';

function* getJobsSaga() {
  while (true) {
    const task = yield fork(rsf.firestore.syncCollection, firestore.collection('jobs'), {
      failureActionCreator: getJobsFailure,
      successActionCreator: getJobsSuccess,
      transform: collectionTransformer,
    });
    yield take(types.GET_JOBS.PAUSE);
    yield cancel(task);
  }
}

export default function* jobsRootSaga() {
  yield takeEvery(types.GET_JOBS.REQUEST, getJobsSaga);
}
