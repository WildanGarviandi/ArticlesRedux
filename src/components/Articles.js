/* jshint esversion:6 */

import React, { Component } from 'react';
import {
  ListView,
  NetInfo,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Item from './Item';

// const { navigate } = this.props.navigation;

export default class Articles extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.props.loadOfflineItems();

    if (NetInfo) {
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.props.checkConnection();
        } else {
          this.props.goOffline();
        }
      });
    } else {
      this.props.checkConnection();
    }
  }

  renderRow(rowData) {
    return (
      <Item
            _id={rowData._id}
            date={rowData.date}
            message={rowData.message}
            title={rowData.title}
            navigation={this.props.navigation}/>
    );
  }

  _handlePress = () => {
    this.props.navigation.navigate('Detail');
  }

  render() {
    let items, readonlyMessage
    if (this.props.connected) {
      items = this.props.onlineItems
    } else if (this.props.connectionChecked) {
      items = this.props.offlineItems
      readonlyMessage = <Text style={styles.offline}>Offline</Text>
    } else {
      items = []
      readonlyMessage = <Text style={styles.offline}>Loading...</Text>
    }

    let article = [];
    items.forEach(element => {
      article = element;
    })

    var sorted_articles = article.sort((a,b) => {
      return new Date(a.date) - new Date(b.date)
    }).reverse();

    return (
      <View style={styles.container}>
        {readonlyMessage}
        <ListView
          dataSource={this.dataSource.cloneWithRows(sorted_articles)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
})
