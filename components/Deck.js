;
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { loadData } from '../actions'

class Deck extends Component {
  componentWillUnmount() {
    this.props.route.params.onBack()
  }

  render() {
    if (!this.props.decks || !this.props.currentDeck)
      return <View><Text>{JSON.stringify(this.props, 2, null)}</Text></View>

    const { decks, currentDeck } = this.props
    const { title, questions } = decks[currentDeck]

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Deck {this.props.currentDeck}</Text>
        <Text>{title}</Text>
        <Text>{questions.length} cards</Text>
        <Button
          title="Go to Add Card"
          onPress={() => this.props.navigation.navigate('Add Card', { onBack: () => this.props.route.params.onBack() })}
        />
        <Button
          title="Go to Quiz"
          onPress={() => this.props.navigation.navigate('Quiz')}
        />
        <View>
        </View>
      </View>
    );
  }

}

function mapStateToProps({ decks, currentDeck }) {
  return { ...decks, ...currentDeck }
}

export default connect(mapStateToProps)(Deck)
