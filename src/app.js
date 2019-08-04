import { createSwitchNavigator, 
    createAppContainer 
} from 'react-navigation'
import AuthLoadingScreen from './screens/authloading'
import AppStack from './routes/app'
import AuthStack from './routes/auth'
import { Root } from 'native-base'
import React from 'react'

const Stack = createAppContainer(
    createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export default () => 
    <Root>
        <Stack />
    </Root>

// import React, {Component} from 'react';
// import {WebView} from 'react-native-webview';

// class App extends Component {
//   render() {
//     return (
//     <WebView source={{ uri: 'http://localhost:8000/' }} />
//     );
//   }
// }

// export default App