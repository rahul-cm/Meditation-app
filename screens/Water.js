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
      selectedValue: '0',
      previousEntry: '0',
    }
    this.save = this.save.bind(this);
  }
  
  save(){
    AsyncStorage.getItem('Token')
    .then(token => {
      return axios({
        method: 'post',
        url: `${server}/water`,
        headers: {
          authorization: JSON.parse(token),
          'Content-Type': 'application/json',
        },
        data: { entry: this.state.selectedValue, date: this.props.navigation.state.params.date},
      });
    })
    .then(response => {
      const data = JSON.parse(response.data);
      if (response.status === 208) {
        alert(`You've already reported drinking ${data} glasses today`);
      } else {
        alert('Success!');
      }
    })
    .catch((err) => {
      alert(err);
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('Token')
      .then(token => {
        return axios.get(`${server}/water`, { headers: { authorization: JSON.parse(token) } })
      })
      .then(res => {
        alert(`You drank ${res.data.entry} glasses today`);
        // this.setState({previousEntry: res.data.entry});
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/stream.gif')}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>How many glasses of water did you drink?</Text>
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
          onPress={this.save}
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
