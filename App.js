/*jshint esversion: 6 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/containers/App';
import configureStore from './src/store/configureStore';
import DetailArticle from './src/components/DetailArticle';

import { StackNavigator } from 'react-navigation';

const store = configureStore();

class Root extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
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
    return (
      <Provider store={store}>
          <App navigation={this.props.navigation}/>
        </Provider>
    )
  }
}

export const SimpleApp = StackNavigator({ 
    Home: { screen: Root },
    Detail: { screen : DetailArticle },
});

const AppNavigation = () => (
  <SimpleApp  />
);

export default class Index extends React.Component {
  render() {
    return (
        <AppNavigation/>
    );
  }
}
