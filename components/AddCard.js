import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  componentWillUnmount() {
    this.props.route.params.onBack()
  }


  render() {
    const { navigation, dispatch, currentDeck } = this.props

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Add Card to {currentDeck}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />
        <Button title='add' onPress={() => {
          dispatch(addCard({ question: this.state.question, answer: this.state.answer }, currentDeck))
          navigation.navigate('Deck')
        }} disabled={!this.state.question || !this.state.answer} />
      </View>
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

function mapStateToProps({ decks }) {
  return { currentDeck: decks.currentDeck }
}

export default connect(mapStateToProps)(AddCard)