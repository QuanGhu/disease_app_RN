import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
class Home extends React.Component {
    render() {
        return (
          <View style={ { 
              justifyContent: 'center', alignContent: 'space-between', 
              flex : 1, padding : 25}
          }>
            <Text style={ { textAlign : 'center'}}> Selamat Datang </Text>
            <Button style={{justifyContent: 'center', marginTop : 15}} info>
              <Text style={ { textAlign : 'center', color : 'white'}}> Buat Analisa Baru </Text>
            </Button>
          </View>
        );
    }
}

export default Home