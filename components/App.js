import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewDeck from './NewDeck'
import Quiz from './Quiz'
import Home from './Home'
import Deck from './Deck'
import AddCard from './AddCard'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducers } from '../reducers'
import { setLocalNotification } from '../utils'

const Stack = createStackNavigator();

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
              headerTitle: () => <Text></Text>,
              headerRight: () => {
                return <Text
                  style={{ marginRight: 10, color: '#246B8B', fontSize: 25 }}
                  onPress={() => navigation.navigate('New Deck')}>new deck</Text>
              }
            })
            } />
            <Stack.Screen name="New Deck" component={NewDeck} />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="Add Card" component={AddCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer >
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});