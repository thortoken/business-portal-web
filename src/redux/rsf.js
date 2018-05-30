import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { credentials } from '../credentials';

const firebaseApp = firebase.initializeApp({
  ...credentials.firebase,
});

export const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});

const rsf = new ReduxSagaFirebase(firebaseApp, firestore);

export default rsf;
