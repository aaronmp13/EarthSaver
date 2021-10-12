import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Firebase from '../firebase/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed: {
    shadowOpacity: 0.6,
    shadowRadius: 2
  },
  feedTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    alignItems: "center",
    color: "#000"
  },
  feedText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000"
  },
});