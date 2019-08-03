import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/home'

export default createAppContainer(
    createBottomTabNavigator(
      {
        Home: { screen: HomeScreen }
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let IconComponent = Ionicons;
              let iconName;
              if (routeName === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`
                IconComponent = HomeIconWithBadge; 
              }
      
              return <IconComponent name={iconName} size={25} color={tintColor} />
            },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
      }
    )
  );