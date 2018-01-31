/*jshint esversion:6*/

import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Articles, { Router } from '../../App';

export default class DetailArticle extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2F95D6',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 3,
      },
      headerTitleStyle: {
        fontSize: 18,
      },
  });

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}> {params.title} </Text>
        <Text style={styles.messageText}> {params.message} </Text>
        <Text style={styles.dateText}> {params.date} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  titleText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
    marginLeft:10,
    marginTop:10
  },
  messageText: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft:10
  },
  dateText: {
    fontSize: 12,
    color: '#78909C',
    marginLeft:10
  },
});
