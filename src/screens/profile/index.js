import React from 'react'
import { Text, AsyncStorage} from 'react-native'
import { Container, Content, Card, H3, Button, Toast } from 'native-base'
class Index extends React.Component {
    constructor() {
      super()
      this.state = {
        name : "",
        age : "",
        address : "",
        gender : "",
        email : ""
      }
    }

    componentDidMount = async() => {
      console.log(AsyncStorage.getItem('token'))
      fetch('http://35.240.135.149/api/user/detail', {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
          }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(!responseJson.success) {
              if(responseJson.errors) {
                  responseJson.errors.map( err => {
                      Toast.show({
                          text: err,
                          buttonText: 'Ok',
                          type : 'danger'
                      })
                  })
              } else {
                  Toast.show({
                      text: responseJson.message,
                      buttonText: 'Ok',
                      type : 'danger'
                  })
              }
          } else {
              this.setState({
                name : responseJson.data.name,
                age : responseJson.data.age,
                gender : responseJson.data.gender,
                address : responseJson.data.address,
                email : responseJson.data.email
              })
          }
          console.log(this.state)
      })
      .catch((error) => {
          Toast.show({
              text: 'Call Administrator',
              buttonText: 'Ok',
              type : 'danger'
          })
      });
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
          <Container>
            <Content style={{ padding : 25}}>
                <Card style={{ padding : 15 }}>
                  <H3> Nama </H3>
                  <Text style={{ marginBottom : 15}}> {this.state.name} </Text>
                  <H3> Umur </H3>
                  <Text style={{ marginBottom : 15}}> {this.state.age} </Text>
                  <H3> Alamat </H3>
                  <Text style={{ marginBottom : 15}}> {this.state.address} </Text>
                  <H3> Jenis Kelamin </H3>
                  <Text style={{ marginBottom : 15}}> {this.state.gender} </Text>
                  <H3> Email </H3>
                  <Text style={{ marginBottom : 15}}> {this.state.email} </Text>
                  <Button onPress={ () => this.props.navigation.navigate('EditProfile') } style={{ backgroundColor : '#3F51B5', justifyContent : 'center', alignContent : 'center', marginBottom : 15}}>
                    <Text style={{ color : 'white' }}> Ubah Data </Text>
                  </Button>
                  <Button onPress={ this._signOutAsync } style={{ backgroundColor : '#00BCD4', justifyContent : 'center', alignContent : 'center'}}>
                    <Text style={{ color : 'white' }}> Keluar </Text>
                  </Button>
                </Card>
            </Content>
          </Container>
        );
    }
}

export default Index