import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { mainTextStyle, inputTextStyle, containerStyle } from '../utils/style';

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
      <View style={containerStyle}>
        <Text style={{ ...mainTextStyle, color: 'black' }}>Add Card to {currentDeck}</Text>
        <TextInput
          style={inputTextStyle}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder="The sky is blue"
        />
        <TextInput
          style={inputTextStyle}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder="True"
        />
        <Button title='add' onPress={() => {
          dispatch(addCard({ question: this.state.question, answer: this.state.answer }, currentDeck))
          navigation.navigate('Deck')
        }} disabled={!this.state.question || !this.state.answer} />
      </View>
    );
  }

}

function mapStateToProps({ decks }) {
  return { currentDeck: decks.currentDeck }
}

export default connect(mapStateToProps)(AddCard)