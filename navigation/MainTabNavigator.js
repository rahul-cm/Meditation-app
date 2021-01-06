import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import Meditations from '../screens/Meditations';
import JournalScreen from '../screens/JournalScreen';
import Settings from '../screens/Settings';
import TodoScreen from '../screens/TodoScreen';
import Water from '../screens/Water';
import Sleep from '../screens/Sleep';
import Exercise from '../screens/Exercise';
import Goals from '../screens/Goals';

export default TabNavigator(
  {
    Home: {
      screen: StackNavigator(
        {
          Home: HomeScreen,
          Journal: JournalScreen,
          Todo: TodoScreen,
          Settings: Settings,
          Water: Water,
          Meditations: Meditations,
          Sleep: Sleep,
          Exercise: Exercise,
          Goals: Goals,
        }
      ),
    },
    Calendar: {
      screen: CalendarScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'Calendar':
            iconName = Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
