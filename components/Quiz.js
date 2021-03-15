import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { containerStyle, mainTextStyle, secondaryTextStyle } from '../utils/style';
import { startQuiz } from '../actions'

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

  restartQuiz = () => {
    this.setState({ ...this.state, index: 0, answers: [] })
  }

  moveToNextQuestion = (answer) => {
    this.setState({ ...this.state, index: this.state.index + 1, answers: [...this.state.answers, answer] })
  }

  componentDidMount() {
    this.props.dispatch(startQuiz())
  }

  componentWillUnmount() {
    this.props.route.params.onBack()
  }

  render() {

    const { questions, currentDeck, navigation } = this.props
    const length = questions.length

    if (this.state.index === questions.length) {
      return <View style={containerStyle}>
        <Text style={{ ...mainTextStyle, color: 'black' }}>You answered all questions 👍</Text>
        <Text>Here are the results:</Text>
        <Text>{questions.map((question, i) => `${i + 1}) ${question.question.substring(0, 10)}... (${question.answer}): ${this.state.answers[i]} ${getEmoji(this.state.answers[i], question.answer)}\n`)}</Text>
        <Text>You have answered {getNumberOfCorrectAnswers(questions, this.state.answers)} out of {length} correctly</Text>
        <Button title="Restart Quiz" onPress={() => this.restartQuiz()} />
        <Button title="Back to Deck" onPress={() => navigation.navigate('Home')} />
      </View>
    }

    return (
      <View style={containerStyle}>
        <Text style={secondaryTextStyle}>{currentDeck} ({this.state.index + 1}/{questions.length})</Text>
        <Text style={{ ...mainTextStyle, color: 'black' }}>{questions[this.state.index][this.state.mode]}</Text>
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

function getEmoji(actual, expected) {
  return actual === expected ? '✅' : '❌'
}

function getNumberOfCorrectAnswers(questions, answers) {
  let numberOfCorrectAnswers = 0
  questions.forEach(({ answer }, i) => answer === answers[i] ? numberOfCorrectAnswers++ : null)
  return numberOfCorrectAnswers
}


export default connect(mapStateToProps)(Quiz)