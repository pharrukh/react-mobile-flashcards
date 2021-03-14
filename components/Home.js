import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { loadData, setDeck } from '../actions'

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(loadData())
  }

  onBack = () => {
    this.props.dispatch(loadData())
  }

  render() {
    if (!this.props.decks)
      return <View><Text>{JSON.stringify(this.props, 2, null)}</Text></View>

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>Home Screen</Text>
        <Button
          title="Go to New Deck"
          onPress={() => this.props.navigation.navigate('New Deck')}
        />
        <ScrollView>
          {Object.keys(this.props.decks).map(key =>
            <View key={key}>
              <Text>{key}</Text>
              <Text>{this.props.decks[key].questions.length} cards</Text>
              <Button title='Go to' onPress={() => {
                this.props.dispatch(setDeck(key))
                this.props.navigation.navigate('Deck', { onBack: () => this.onBack() })
              }} />
            </View>)}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return { ...decks }
}

export default connect(mapStateToProps)(Home)