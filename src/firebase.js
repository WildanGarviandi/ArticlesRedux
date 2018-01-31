/*jshint esversion: 6*/

import { initializeApp } from 'firebase';
import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items';

import config from '../config';

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
});

export const itemsRef = firebaseApp.database().ref();
const connectedRef = firebaseApp.database().ref('.info/connected');

export function syncFirebase(store) {
  var child = itemsRef.child('e5d65252-21c8-4030-951f-8a441d886740');

  child.on('value', (snapshot) => {
    var items = [];
      snapshot.forEach((child) => {
        items.push({
          title: child.val().title,
          message: child.val().message,
          date: child.val().date,
          _id: child.val().id
        });
      });
    store.dispatch(addItemSuccess(items));
  });

  connectedRef.on('value', snap => {
    if (snap.val() === true) {
      store.dispatch(goOnline());
    } else {
      store.dispatch(goOffline());
    }
  });
}
