import React from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  View,
  Image, 
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Meditations extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    names: [
       {'name': '1 MINUTE MEDITATION', 'id': 1},
       {'name': '5 MINUTE MEDITATION', 'id': 2},
       {'name': '8 MINUTE MEDITATION', 'id': 3},
       {'name': '60 MINUTE MEDITATION', 'id': 4},
    ]
 }
 render() {
    return (
      <ImageBackground
      source={require('../assets/images/mainScreen.gif')}
      style={styles.container}
    >
       <View>
          <ScrollView>
             {
                this.state.names.map((item, index) => (
                   <View key = {item.id} style = {styles.item}>
                      <Image source={require('../assets/images/meditate.jpg')} style={styles.image}/>
                      <Text>{item.name}</Text>
                   </View>
                ))
             }
          </ScrollView>
       </View>
       </ImageBackground>
    )
 }
}
//   render() {
//     return (
//       <ScrollView contentContainerStyle={styles.container}>
//         <Ionicons name='ios-at-outline' color='blue' size={20} />
//         <Text style={styles.text}>1 min meditation</Text>
//         <Ionicons name='ios-at-outline' color='blue' size={20} />
//         <Text style={styles.text}>8 min meditation</Text>
//         <Text style={styles.text}>20 min meditation</Text>
//         <Text style={styles.text}>60 min meditation</Text>
//         <Text style={styles.text}>Soothing Music 1</Text>
//         <Text style={styles.text}>Soothing Music 2</Text>
//         <Text style={styles.text}>Soothing Music 3</Text>
//         <Text style={styles.text}>Soothing Music 4</Text>
//         <Text style={styles.text}>Soothing Music 5</Text>
//       </ScrollView>
//     )
//   }
// }

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#f48d0e',
  },
  image: {
    width: 200,
    height: 100,
  },
  // container: {
  //   flex: 1,
  //   paddingTop: 15,
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // text: {
  //   fontSize: 30,
  // }
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
})
