import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';
import { credentials } from '../credentials';

const firebaseApp = firebase.initializeApp({
  ...credentials.firebase,
});

const rsf = new ReduxSagaFirebase(firebaseApp, firebase.firestore());

export default rsf;
