/*jshint esversion:6*/

import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableHighlight
} from 'react-native';

export default class Item extends Component {
  constructor(props) {
    super(props);
    
    this.onPress = this.onPress.bind(this);
  }

  onPress(article) {
    // do navigation
    this.props.navigation.navigate('Detail', article)
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this.onPress(this.props)}>
          <View style={styles.row}>
            <Text style={styles.titleText}>
              {this.props.title}
            </Text>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.messageText}>
              {this.props.message}
            </Text>
            <Text style={styles.dateText}>
              {this.props.date}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  titleText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    marginBottom: 5
  },
  messageText: {
    fontSize: 14,
    marginBottom: 5
  },
  dateText: {
    fontSize: 12,
    color: '#78909C'
  },
})
