import React from 'react';
import { TextInput, View, Text, AsyncStorage, StyleSheet, ImageBackground} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import { server } from '../globalVars';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();

    this.inputRefs = {};

    this.state = {
      username: '',
      password: '',
      email: '',
      securityQuestion: '',
      securityQuestionsList: [
        {
          label: 'What is the maiden name of your mother?'
        },
        {
          label: 'What city were you born?'
        },
        {
          label: 'What was the name of your first pet?'
        },
        {
          label: 'What year were you born?'
        },
        {
          label: 'What year did you start to meditate?'
        }
      ]
    };
    this.signup = this.signup.bind(this);
  }

  signup() {
    console.log("in signup front  end")
    axios.post(`${server}/signup`, { username: this.state.username, password: this.state.password, email: this.state.email, securityQuestion: this.state.securityQuestion, securityAnswer: this.state.securityAnswer })
      .then(res => {
        AsyncStorage.setItem('Token', JSON.stringify(res.data));
        this.props.navigation.navigate('Main');
      })
      .catch(err => {
        console.error(err);
        alert('Sorry, there was a problem. Please try again');
      });
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/treeStars.jpg')}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(username) => this.setState({ username })}
            placeholder="username"
            value={this.state.username}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({ email })}
            placeholder="email"
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
            placeholder="password"
            value={this.state.password}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(securityQuestion) => this.setState({ securityQuestion })}
            placeholder="Enter a Security Question"
            value={this.state.securityQuestion}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(securityAnswer) => this.setState({ securityAnswer })}
            placeholder="Enter a Security Question answer"
            value={this.state.securityAnswer}
          />
          <Button
            buttonStyle={styles.button}
            title="Create account"
            onPress={this.signup}
          />
          <Button
            buttonStyle={styles.button}
            title="Sign in with existing account"
            onPress={() => this.props.navigation.navigate('Signin')}
          />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    borderWidth: 0,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,.8)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  button: {
    backgroundColor: '#191970',
    marginBottom: 10
  }
});
