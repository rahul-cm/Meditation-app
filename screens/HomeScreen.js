import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';
import axios from 'axios';
import { MonoText } from '../components/StyledText';
import { server } from '../globalVars';

const starImages = [
  require('../assets/images/0star.png'),
  require('../assets/images/1star.png'),
  require('../assets/images/2star.png'),
  require('../assets/images/3star.png'),
  require('../assets/images/4star.png'),
  require('../assets/images/5star.png'),
  require('../assets/images/6star.png'),
  require('../assets/images/7star.png'),
  require('../assets/images/8star.png')
]

const buttons = [
  {
    title: 'Gratitude',
    route: 'Journal',
    icon: 'ios-hand' 
  },
  {
    title: 'To Do',
    route: 'Todo',
    icon: 'ios-list'
  },
  {
    title: 'Meditate',
    route: 'Meditations',
    icon: 'ios-man'
  },
  {
    title: 'Water',
    route: 'Water',
    icon: 'ios-water'
  },
  {
    title: 'Exercise',
    route: 'Exercise',
    icon: 'ios-heart'
  },
  {
    title: 'Sleep',
    route: 'Sleep',
    icon: 'ios-moon'
  },
  {
    title: 'Goals',
    route: 'Goals',
    icon: 'ios-compass'
  },
  {
    title: 'Settings',
    route: 'Settings',
    icon: 'ios-settings'
  }
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const day = new Date().getDate();
    const dateString = `${month}-${day}-${year}`;
    this.state = {
      completions: starImages[0],
      date: { dateString },
    };
    this.navigateTo = this.navigateTo.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('Token')
      .then(token => {
        return axios.get(`${server}/userCompletions`, { headers: { authorization: JSON.parse(token) } })
      })
      .then(res => {
        this.setState({completions: starImages[JSON.parse(res.data)]});
      })
      .catch(err => console.error(err));
  }

  getAdjective() {
    
  }

  navigateTo(route) {
    this.props.navigation.navigate(route, { date: this.state.date });
  }

  renderButton(button) {
    return (
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          onPress={() => this.navigateTo(button.route)}
          style={styles.button}
        >
          <Ionicons name={button.icon} color='#f3e1f7' size={40} />
        </TouchableOpacity>
        <Text style={styles.buttonText}>{button.title}</Text>
      </View>
    );
  }


  render() {
    return (
      <ImageBackground
        source={require('../assets/images/mainScreen.gif')}
        style={styles.container}
      >
        <Image
          source={this.state.completions}
          style={styles.starImage}
        />
        <Text> </Text>
        <View style={styles.buttonsRow}>
          {buttons.slice(0, 3).map(button => this.renderButton(button))}
        </View>
        <View style={styles.buttonsRow}>
          {buttons.slice(3, 6).map(button => this.renderButton(button))}
        </View>
        <View style={styles.buttonsRow}>
          {buttons.slice(6).map(button => this.renderButton(button))}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  starImage: {
    width: 300,
    height: 300,
    marginTop: 40
  },
  welcome: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 8
  },
  buttonsRow: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#c394cc',
    borderRadius: 80,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'purple',
    borderStyle: 'solid'
  },
  buttonColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '33%',
    width: '33%',
    position: 'relative'
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  }
});
 
