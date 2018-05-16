import { select } from 'redux-saga/effects';

export default function* startup(action) {
  const user = yield select(state => state.login);
}
