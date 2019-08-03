import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import HomeScreen from '../screens/home'
import ProfileScreen from '../screens/profile/index'
import HistoryScreen from '../screens/diagnose/history'
import ResultScreen from '../screens/diagnose/result'

const DiagnoseStack = createStackNavigator({
  History : { screen: HistoryScreen },
  Result : { screen: ResultScreen },
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});

export default createAppContainer(
    createBottomTabNavigator(
      {
        Home: { screen: HomeScreen },
        'Riwayat Diagnosa' : { screen : DiagnoseStack },
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
              } else if(routeName === 'Riwayat Diagnosa') {
                icon = 'history'
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