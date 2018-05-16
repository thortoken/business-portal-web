import firebase from 'firebase';
import { call, fork, put, take, takeEvery, all, select } from 'redux-saga/effects';

export default function* startup(action) {
  const user = yield select(state => state.login);
}