/*jshint esversion: 6 */

import offline from 'react-native-simple-store';
import { itemsRef } from '../firebase';

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const OFFLINE_ITEMS_LOADED = 'OFFLINE_ITEMS_LOADED';
export const CONNECTION_CHECKING = 'CONNECTION_CHECKING';
export const CONNECTION_CHECKED = 'CONNECTION_CHECKED';
export const CONNECTION_ONLINE = 'CONNECTION_ONLINE';
export const CONNECTION_OFFLINE = 'CONNECTION_OFFLINE';

export function addItem(title) {
  const id = Math.random().toString(36).substring(7)
  const itemRef = itemsRef.child('e5d65252-21c8-4030-951f-8a441d886740');

  itemRef.set({
    id,
    title: title,
    time: new Date().getTime()
  })

  return {
    type: ADD_ITEM
  }
}
//return sender, import attempt
export function addItemSuccess(itemData) {
  return {
    type: ADD_ITEM_SUCCESS,
    itemData: itemData
  }
}

function offlineItemsLoaded(items) {
  return {
    type: OFFLINE_ITEMS_LOADED,
    items: items
  };
}

export function loadOfflineItems() {
  return dispatch => {
    offline.get('e5d65252-21c8-4030-951f-8a441d886740').then(items => {
      dispatch(offlineItemsLoaded(items || []));
    });
  };
}

export function checkConnection() {
  return dispatch => {
    dispatch({type: CONNECTION_CHECKING})
    setTimeout(() => dispatch({type: CONNECTION_CHECKED}), 5000);
  };
}

export function goOnline() {
  return {
    type: CONNECTION_ONLINE
  };
}

export function goOffline() {
  return {
    type: CONNECTION_OFFLINE
  };
}
