import React from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  View, 
  Button,
  ImageBackground, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsList from 'react-native-settings-list';


export default class Meditations extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/mainScreen.gif')}
        style={styles.container}
      >
      <Text style={styles.headingText}>User Profile and Settings Coming Soon</Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
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
});
