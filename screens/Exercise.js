import React from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  Picker,
  ImageBackground,
  AsyncStorage, 
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { server } from '../globalVars';

export default class Sleep extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0'
    }
    this.submitExercise = this.submitExercise.bind(this);
  }

  submitExercise(){
    AsyncStorage.getItem('Token')
      .then(token =>{
        return axios({
          method: 'post',
          url: `${server}/exercise`,
          headers: {
            authorization: JSON.parse(token),
            'Content-Type': 'application/json',
          },
          data: { entry: this.state.entry, date: this.props.navigation.state.params.date},
        });
      })
      .then(response =>{
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/rain.gif')}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>How many minutes did you exercise?</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        >
          <Picker.Item label="0" value='0' />
          <Picker.Item label="5" value='5' />
          <Picker.Item label="10" value='10' />
          <Picker.Item label="15" value='15' />
          <Picker.Item label="20" value='20' />
          <Picker.Item label="25" value='25' />
          <Picker.Item label="30" value='30' />
          <Picker.Item label="35" value='35' />
          <Picker.Item label="40" value='40' />
          <Picker.Item label="45" value='45' />
          <Picker.Item label="50" value='50' />
          <Picker.Item label="55" value='55' />
          <Picker.Item label="60" value='60' />
          <Picker.Item label="60+" value={'60+'} />
        </Picker>
        <Button
          title="Save"
          buttonStyle={styles.button}
          onPress={this.submitExercise}
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
