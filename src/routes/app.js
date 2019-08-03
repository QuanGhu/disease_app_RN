import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/home'
import ProfileScreen from '../screens/profile/index'

export default createAppContainer(
    createBottomTabNavigator(
      {
        Home: { screen: HomeScreen },
        Profile: { screen: ProfileScreen }
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let IconComponent = FontAwesome;
              let icon
              if (routeName === 'Home') {
                icon = `home`
              } else if(routeName === 'Profile') {
                icon = `user`
              }
      
              return <IconComponent name={icon} size={25} color={tintColor} />
            },
        }),
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
      }
    )
  );