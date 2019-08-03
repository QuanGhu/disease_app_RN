import { createSwitchNavigator, 
    createAppContainer 
} from 'react-navigation'
import AuthLoadingScreen from './screens/authloading'
import AppStack from './routes/app'
import AuthStack from './routes/auth'

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
));