import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Container,
  Header,
  Title,
  Content,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import { NavigationActions } from 'react-navigation';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(){
    super();
    this.state = {
      modalVisible: false,
      date: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.goToJournal = this.goToJournal.bind(this);
    this.goToTodo = this.goToTodo.bind(this);
  }

  toggleModal(date) {
    this.setState({ date });
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  goToJournal() {
    this.toggleModal();
    this.props.navigation.navigate('Journal', { date: this.state.date });
  }

  goToTodo() {
    this.toggleModal();
    this.props.navigation.navigate('Todo', { date: this.state.date });
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={(date) => this.toggleModal(date)}
          monthFormat={'MMM yyyy'}
          onMonthChange={(month) => { console.log('month changed', month) }}
          hideExtraDays={true}
          firstDay={1}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 22, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Button
                title="View your journal entry for this day"
                onPress={this.goToJournal}
                buttonStyle={styles.link}
              />
              <Button
                title="View your todo list for this day"
                onPress={this.goToTodo}
                buttonStyle={styles.link}
              />
              <Button
                title="Back to calendar"
                onPress={this.toggleModal}
                buttonStyle={styles.link}
              />
            </View>
          </View>
        </Modal>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  link: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'blue'
  },
});
