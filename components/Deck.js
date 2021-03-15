import React, { Component } from 'react'
import { Text, View, Button, } from 'react-native'
import { connect } from 'react-redux'
import { containerStyle, mainTextStyle, secondaryTextStyle } from '../utils/style'
class Deck extends Component {
  componentWillUnmount() {
    this.props.route.params.onBack()
  }

  render() {
    if (!this.props.decks || !this.props.currentDeck)
      return <View><Text></Text></View>

    const { decks, currentDeck } = this.props
    const { title, questions } = decks[currentDeck]

    return (
      <View style={containerStyle}>
        <Text style={{ ...mainTextStyle, color: 'black' }}>Deck {this.props.currentDeck}</Text>
        <Text style={secondaryTextStyle}>{questions.length} cards</Text>
        <Button
          title="Go to Add Card"
          onPress={() => this.props.navigation.navigate('Add Card', { onBack: () => this.props.route.params.onBack() })}
        />
        <Button
          title="Go to Quiz"
          onPress={() => this.props.navigation.navigate('Quiz', { onBack: () => this.props.route.params.onBack() })}
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
