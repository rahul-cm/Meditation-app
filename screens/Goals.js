import React from 'react';
import { 
  ScrollView, 
  Text, 
  TextInput, 
  Modal, 
  View, 
  AsyncStorage, 
  StyleSheet,
  ImageBackground, } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import RoundCheckbox from 'rn-round-checkbox';
import axios from 'axios';
import { server } from '../globalVars';

export default class Goals extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      input: '',
      modalVisible: false,
      date: this.props.navigation.state.params.date.dateString,
      isSelected: true
    };
    this.createTodo = this.createTodo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.pressCheck = this.pressCheck.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('Token')
      .then(token => {
        return axios.get(`${server}/todo`, { headers: { Authorization: JSON.parse(token), date: this.state.date } });
      })
      .then(res => {
        const newTodos = res.data.map(obj => obj.item);
        return this.setState({ todo: this.state.todo.concat(newTodos) });
      })
      .catch(err => console.log(err));
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  createTodo() {
    if (!this.state.todo.includes(this.state.input)) {
      this.setState({ todo: this.state.todo.concat(this.state.input)})
      AsyncStorage.getItem('Token')
        .then(token => {
          return axios({
            method: 'post',
            url: `${server}/todo`,
            headers: {
              authorization: JSON.parse(token),
              'Content-Type': 'application/json',
            },
            data: {
              todo: this.state.input,
              date: this.state.date,
            },
          });
        })
        .then((res) => {
          this.toggleModal();
        })
        .catch((err) => console.log(err));
    } else {
      alert('You already have that in your to do list');
    }
  }

  pressCheck(bool) {
    this.setState({ [`isSelected${i}`]: !this.state[`isSelected${i}`] });
    // make a request to update the completion status of this item in the database
  }

  render() {
    const todoList = this.state.todo.map((element, i) => {
      this.state[`isSelected${i}`] = this.state[`isSelected${i}`] || false;
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <RoundCheckbox
            size={24}
            checked={this.state[`isSelected${i}`]}
            onValueChange={(newValue) => this.pressCheck(newValue)}
            style={styles.checkBox}
          />
          <Text key={element} style={styles.listItem}>{element}</Text>
        </View>
      );
    });
    return (
      <ImageBackground
        source={require('../assets/images/waterfall.gif')}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.todoContainer}>
          <Text style={styles.headingText}>My Goals</Text>
          <Text style={styles.date}>{this.state.date}</Text>
          {todoList}
        </View>
        <Button
          style={{ paddingTop: 20 }}
          title="Save"
          onPress={this.toggleModal}
          buttonStyle={styles.button}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <View>
              <TextInput
                placeholder="Enter your task"
                onChangeText={(text) => this.setState({ input: text })}
                style={styles.eventInput}
              />
              <Button
                title="Save event"
                onPress={this.createTodo}
                buttonStyle={styles.button}
              />
              <Button
                title="Close"
                onPress={this.toggleModal}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // marginTop: 50
  },
  eventInput: {
    paddingBottom: 30,
    fontSize: 30,
  },
  button: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#f3e1f7',
    borderRadius: 50,
    marginBottom: 40,
    color: '#f3e1f7',
  },
  headingText: {
    fontSize: 50,
    paddingBottom: 20,
    marginTop: 80,
    color: '#f3e1f7',
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
  },
  date: {
    fontSize: 50,
    paddingBottom: 20,
    color: '#f3e1f7',
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
  },
  modalContainer: {
    // marginTop: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoContainer: {
    height: 'auto',
    minHeight: 400,
    // alignItems: 'center'
  },
  listItem: {
    fontSize: 18,
    color: '#f3e1f7',
    textAlign: 'center',
    textShadowRadius: 10,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
  },
})