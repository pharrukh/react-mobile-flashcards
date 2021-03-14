import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

function getButtonTitle(currentMode) {
  return getOppositeValue(currentMode)
}

function getOppositeValue(mode) {
  return mode === 'question' ? 'answer' : 'question'
}

class Quiz extends Component {
  state = {
    mode: 'question',
    index: 0,
    answers: []
  }

  updateMode = () => {
    this.setState({ ...this.state, mode: getOppositeValue(this.state.mode) })
  }

  moveToNextQuestion = (answer) => {
    this.setState({ ...this.state, index: this.state.index + 1, answers: [...this.state.answers, answer] })
  }

  render() {
    const style = { flex: 1, alignItems: 'center', justifyContent: 'center' }
    const { questions, currentDeck } = this.props

    if (this.state.index === questions.length) {
      return <View style={style}>
        <Text>You answered all questions 👍</Text>
        <Text>Here are the results:</Text>
        <Text>{questions.map((question, i) => `${question.question} (${question.answer}): ${this.state.answers[i]}\n`)}</Text>
      </View>
    }

    return (
      <View style={style}>
        <Text>{currentDeck}</Text>
        <Text>{this.state.index + 1}/{questions.length}</Text>
        <Text>{questions[this.state.index][this.state.mode]}</Text>
        <Button title={getButtonTitle(this.state.mode)} onPress={() => this.updateMode()} />
        {this.state.mode === 'question' ?
          <View>
            <Button title="correct" onPress={() => {
              this.moveToNextQuestion('True')
            }} />
            <Button title="incorrect" onPress={() => {
              this.moveToNextQuestion('False')
            }} />
          </View> : <Text></Text>}
      </View >
    );
  }
}

function mapStateToProps({ decks }) {
  return { currentDeck: decks.currentDeck, questions: decks.decks[decks.currentDeck].questions }
}

export default connect(mapStateToProps)(Quiz)