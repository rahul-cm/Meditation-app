import React from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  Picker,
  ImageBackground 
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class Sleep extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0'
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/sleep.gif')}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>How many hours did you sleep?</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        >
          <Picker.Item label="0" value='0' />
          <Picker.Item label="1" value='1' />
          <Picker.Item label="2" value='2' />
          <Picker.Item label="3" value='3' />
          <Picker.Item label="4" value='4' />
          <Picker.Item label="5" value='5' />
          <Picker.Item label="6" value='6' />
          <Picker.Item label="7" value='7' />
          <Picker.Item label="8" value='8' />
          <Picker.Item label="8+" value={'8+'} />
        </Picker>
        <Button
          title="Save"
          buttonStyle={styles.button}
        />
      </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 50,
    paddingBottom: 20,
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
    color: '#f3e1f7',
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
  },
  button: {
    backgroundColor: '#c394cc',
    color: '#f3e1f7',
    borderRadius: 50,
    marginBottom: 5,
    borderRadius: 50,
    marginTop: 30,
  },
  picker: {
    width: 100, 
    color: '#f3e1f7', 
    backgroundColor: '#c394cc',
    marginTop: 100, 
  }
});
