import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions'
import { mainTextStyle, inputTextStyle, containerStyle } from '../utils/style'

function NewDeck({ navigation, dispatch }) {
  const [deckName, onChange] = React.useState("");

  return (
    <View style={containerStyle}>
      <Text style={{ ...mainTextStyle, color: 'black', marginBottom: 15 }}>What is the title of your new deck?</Text>
      <TextInput
        style={inputTextStyle}
        onChangeText={onChange}
        value={deckName}
        placeholder="uzbek history"
      />
      <Button
        style={{ fontSize: 100 }}
        title='add'
        disabled={!deckName}
        onPress={() => {
          dispatch(addDeck(deckName))
          navigation.navigate('Home')
        }} />
    </View>
  );
}


export default connect()(NewDeck)