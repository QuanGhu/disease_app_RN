import React from 'react'
import { Text, AsyncStorage} from 'react-native'
import { Container, Content, Card, H3, Button } from 'native-base'
class Index extends React.Component {
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };

    render() {
        return (
          <Container>
            <Content style={{ padding : 25}}>
                <Card style={{ padding : 15 }}>
                  <H3> Nama </H3>
                  <Text style={{ marginBottom : 15}}> Ari Putra </Text>
                  <H3> Umur </H3>
                  <Text style={{ marginBottom : 15}}> 48 </Text>
                  <H3> Alamat </H3>
                  <Text style={{ marginBottom : 15}}> Botania </Text>
                  <H3> Jenis Kelamin </H3>
                  <Text style={{ marginBottom : 15}}> L </Text>
                  <H3> Email </H3>
                  <Text style={{ marginBottom : 15}}> ariteknologi@gmail.com </Text>
                  <Button style={{ backgroundColor : '#3F51B5', justifyContent : 'center', alignContent : 'center', marginBottom : 15}}>
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