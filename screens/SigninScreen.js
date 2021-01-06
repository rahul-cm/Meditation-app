import React from 'react';
import {
  TextInput,
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import { server } from '../globalVars';
import SignupScreen from './SignupScreen';
import ForgotPassword from './ForgotPassword';
import loginBackground from '../assets/images/loginBackground.gif';
import star from '../assets/images/8star.png';
import { CheckBox } from 'react-native-elements'

export default class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
    };
    this.login = this.login.bind(this);
    this.setRemember = this.setRemember.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
  }

  setRemember() {
    this.setState({
        rememberMe: !this.state.rememberMe
    });
  }

  login(e) {
    e.preventDefault();
    axios.post(`${server}/signin`, { username: this.state.username, password: this.state.password, rememberMe: this.state.rememberMe })
      .then(res => {
        // alert(res.data)
        if (res.data !== 'Sorry, that password was incorrect') {
          AsyncStorage.setItem('Token', JSON.stringify(res.data));
          this.props.navigation.navigate('Main');
        } else {
          alert(res.data);
        }
      })
      .catch(err => {
        alert(err, 'Sorry, that username/password combination was incorrect');
      })
  }

  goToSignup() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <ImageBackground
        source={loginBackground}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Meditation App</Text>
          <Image style={styles.star} source={star} />
          <TextInput
            style={styles.username}
            onChangeText={(username) => this.setState({ username })}
            placeholderTextColor='#f3e1f7'
            placeholder="Username"
            value={this.state.username}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            placeholderTextColor='#f3e1f7'
            value={this.state.password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
            {/* <CheckBox
              center
              title='Remember Me'
              onPress={this.setRemember}
              checked={this.state.rememberMe}
              textStyle={{color: '#f3e1f7'}}
              containerStyle={styles.button}
              size={12}
              alignItems={{textAlign: "left"}}
            /> */}
            <Button 
              title="Sign in"
              onPress={this.login}
              buttonStyle={styles.signInButton}
              alignItems={{textAlign: "right"}}
            />
            {/* <Button
                  title="Forgot Password"
                  onPress={() => this.props.navigation.navigate('ForgotPassword')}
                  buttonStyle={styles.button}
                /> */}
          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>
          <Text onPress={this.goToSignup} style={styles.createAccount}>
            Create New Account
          </Text>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  innerContainer: {
    flex: 1,
    width: '150%',
    alignItems: 'center',
    paddingTop: 50
  },
  header: {
    fontSize: 42,
    color: '#eac369',
    textShadowColor: 'black',
    textShadowOffset: {
      width: -2,
      height: 2
    },
    textShadowRadius: 3,
    textAlign: 'center'
  },
  username: {
    height: 60,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '40%',
    // backgroundColor: 'rgba(236, 198, 85, 0.5)',
    borderColor: 'transparent',
    marginBottom: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f3e1f7',
    textAlign: 'center',
    fontSize: 24,
  },
  password: {
    height: 40,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '40%',
    // backgroundColor: 'rgba(236, 198, 85, 0.5)',
    borderColor: 'transparent',
    marginBottom: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f3e1f7',
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'black',
    marginBottom: 20,
    color: '#f3e1f7',
  },
  signInButton: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#f3e1f7',
    borderRadius: 50,
    marginBottom: 40,
    color: '#f3e1f7',
  },
  star: {
    width: 150,
    height: 150,
    marginBottom: 30,
    marginTop: 20,
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 150,
    width: '90%'
  },
  forgotPassword: {
    color: '#f3e1f7',
    textDecorationLine: 'underline',
    marginBottom: 10,
    marginTop: 30,
  },
  createAccount: {
    color: '#f3e1f7',
    textDecorationLine: 'underline',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 18,
  },
});
