import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { loadData, setDeck } from '../actions'
import { mainTextStyle } from '../utils/style'

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
      <View style={{ alignItems: 'center', textAlign: 'center' }}>
        <ScrollView >
          {Object.keys(this.props.decks).map(key =>
            <View key={key} style={{
              minHeight: 100,
              minWidth: 350,
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: '#3DDFE3',
              borderRadius: 30,
              margin: 1
            }}>
              <Text style={mainTextStyle} onPress={() => {
                this.props.dispatch(setDeck(key))
                this.props.navigation.navigate('Deck', { onBack: () => this.onBack() })
              }}>{key}</Text>
              <Text style={{ fontSize: 30, textAlign: 'center' }}>{this.props.decks[key].questions.length} {this.props.decks[key].questions.length === 1 ? 'card' : 'cards'}</Text>
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