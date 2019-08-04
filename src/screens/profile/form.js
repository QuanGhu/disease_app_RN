import React from 'react'
import { Text, AsyncStorage } from 'react-native'
import { Container, Content, Card, Item, Input, Label, Button, Toast, Picker, Icon} from 'native-base'

class Form extends React.Component {
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
                  age : responseJson.data.age.toString(),
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

    onValueChange2(value) {
        this.setState({
          gender: value
        });
    }

    render() {
        return (
            <Container>
                <Content style={{ padding : 25}}>
                    <Card style={{ padding : 15 }}>
                        <Item floatingLabel last >
                            <Label>Nama</Label>
                            <Input onChangeText={ (text) => this.setState({ name : text}) } value={this.state.name}/>
                        </Item>
                        <Item floatingLabel last >
                            <Label>Umur</Label>
                            <Input onChangeText={ (text) => this.setState({ age : text}) } value={this.state.age}/>
                        </Item>
                        <Item floatingLabel last >
                            <Label>Alamat</Label>
                            <Input onChangeText={ (text) => this.setState({ address : text}) } value={this.state.address}/>
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined, color : 'white' }}
                            placeholder="Masukan Jenis Kelamin Anda"
                            placeholderStyle={{ color: "white" }}
                            placeholderIconColor="white"
                            selectedValue={this.state.gender}
                            onValueChange={this.onValueChange2.bind(this)}
                        >
                            <Picker.Item label="Laki Laki" value="L" />
                            <Picker.Item label="Perempuan" value="P" />
                        </Picker>

                        <Button style={{ backgroundColor : '#3F51B5', justifyContent : 'center', alignContent : 'center', marginBottom : 15}}>
                            <Text style={{ color : 'white' }}> Perbarui Data </Text>
                        </Button>
                    </Card>
                </Content>
            </Container>
        )
    }
}

export default Form