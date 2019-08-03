import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../screens/auth/login'
import RegisterScreen from '../screens/auth/register'

const AuthStack = createStackNavigator({
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
  
export default createAppContainer(AuthStack);