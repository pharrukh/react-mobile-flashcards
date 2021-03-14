import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions'

function NewDeck({ navigation, dispatch }) {
  const [deckName, onChange] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>New Deck</Text>
      <Text>What is the title of your new deck?</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={deckName}
      />
      <Button title='add' disabled={!deckName} onPress={() => {
        dispatch(addDeck(deckName))
        navigation.navigate('Home')
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect()(NewDeck)