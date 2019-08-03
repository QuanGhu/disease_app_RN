import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../screens/auth/login'

const AuthStack = createStackNavigator({
        Login: {
            screen: LoginScreen
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