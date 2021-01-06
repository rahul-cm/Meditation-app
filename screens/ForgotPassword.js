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


export default class ForgotPassword extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();
    this.state = {
        email: '',
        securityQuestion: '',
        answer: '',
        validated: false,
        newPassword: ''
    };
    this.checkSecurityQuestion = this.checkSecurityQuestion.bind(this)
    this.checkSecurityAnswer = this.checkSecurityAnswer.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }
  checkSecurityQuestion(e) {
    e.preventDefault();
    axios.post(`${server}/checkSecurityQuestion`, {email: this.state.email })
      .then(res => {
        if(res.data) {
          this.setState({
            securityQuestion: res.data
          })
        }
        else { console.alert("That user email was not found")}
      })
  }

  checkSecurityAnswer(e) {
    e.preventDefault();
    axios.post(`${server}/checkSecurityAnswer`, {email: this.state.email, answer: this.state.email })
      .then(res => {
        if(res.data === "correct") {
          this.setState({
            validated: true
          })
        }
        else { console.alert("That security answer was incorrect")}
      })
  }

  resetPassword(e) {
    e.preventDefault();
    axios.post(`${server}/resetPassword`, {email: this.state.email, newPassword: this.state.newPassword })
    .then(res => {
      console.log(res.data, "this is res")
      if(res.data === "updated") {
        //// send modal saying updated password, please return to the main page...
        ///then make the main button work lol
        console.log("updated password!")
      }
      else { console.alert("error, please contacft admin")}
    })
  }

  goBack(e) {
    e.preventDefault();
          this.props.navigation.navigate('Main');
  }

  render() {
      if(this.state.validated){
        return (
          <ImageBackground
          source={require('../assets/images/treeStars.jpg')}
          style={styles.container}
        >
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(newPassword) => this.setState({ newPassword })}
              placeholderTextColor='navy'
              placeholder="Enter New Password"
              value={this.state.newPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button 
              title="Reset My Password"
              onPress={this.resetPassword}
              buttonStyle={styles.button}
              titleStyle={{ color: 'black' }}
              color='navy'
              alignItems={{textAlign: "right"}}
            />
            <Button 
              title="Main"
              onPress={this.goBack}
              buttonStyle={styles.button}
              titleStyle={{ color: 'black' }}
              color='navy'
              alignItems={{textAlign: "right"}}
            />
          </View>
        </ImageBackground>
      )
      }
      if(!this.state.securityQuestion){
        return (
          <ImageBackground
          source={require('../assets/images/treeStars.jpg')}
          style={styles.container}
        >
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({ email })}
              placeholderTextColor='navy'
              placeholder="Enter Your Email Address"
              value={this.state.email}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button 
              title="Show me Security Question"
              onPress={this.checkSecurityQuestion}
              buttonStyle={styles.button}
              titleStyle={{ color: 'black' }}
              color='navy'
              alignItems={{textAlign: "right"}}
            />
            <Button 
              title="Main"
              onPress={this.goBack}
              buttonStyle={styles.button}
              titleStyle={{ color: 'black' }}
              color='navy'
              alignItems={{textAlign: "right"}}
            />
          </View>
        </ImageBackground>
      )
    }
    if(this.state.securityQuestion) {
      return (
        <ImageBackground
        source={require('../assets/images/treeStars.jpg')}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text>{this.state.securityQuestion}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(answer) => this.setState({ answer })}
            placeholderTextColor='navy'
            placeholder="Enter Your Answer"
            value={this.state.answer}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button 
            title="Validate Answer to Security Questionad "
            onPress={this.checkSecurityAnswer}
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            color='navy'
            alignItems={{textAlign: "right"}}
          />
          <Button 
            title="Main"
            onPress={this.goBack}
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            color='navy'
            alignItems={{textAlign: "right"}}
          />
        </View>
      </ImageBackground>
    )
    }
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
    width: '100%',
    alignItems: 'center',
    paddingTop: 50
  },
  header: {
    fontSize: 36,
    color: 'yellow',
    textShadowColor: 'red',
    textShadowOffset: {
      width: -2,
      height: 2
    },
    textShadowRadius: 3,
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    width: '90%',
    backgroundColor: 'rgba(236, 198, 85, 0.5)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'rgba(236, 198, 85, 0.5)',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  star: {
    width: 275,
    height: 275,
    marginBottom: 30
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 150,
    width: '90%'
  },
  bottomText: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  forgotPassword: {
    color: 'white',
    top: 80,
  },
  newAccount: {
    color: 'white',
    top: 100,
  }
});
