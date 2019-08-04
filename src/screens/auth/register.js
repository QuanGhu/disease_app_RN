import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Container, Form, Item, Input, Label, Button, Picker, Icon, Toast} from 'native-base'
import axios from 'axios'
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: "L",
            name : "",
            age : "",
            address : "",
            email : "",
            password : "",
            user_level_id : 2
        };
    }
    onValueChange2(value) {
        this.setState({
          gender: value
        });
    }
    _signUPAsync = () => {
        fetch('http://35.240.135.149/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
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
                Toast.show({
                    text: responseJson.message,
                    buttonText: 'Ok',
                    type : 'success'
                })
                this.props.navigation.navigate('Login');
            }
        })
        .catch((error) => {
            Toast.show({
                text: 'Call Administrator',
                buttonText: 'Ok',
                type : 'danger'
            })
        });
    };

    render() {
        return (
            <Container>
                <View style={styles.centered}>
                    <View style={styles.textCenter}>
                        <Text style={styles.h2White}> Selamat Datang di Aplikasi Sistem Pakar </Text>
                        <Text style={styles.h3White}> Silakan Masuk Untuk Melanjutkan </Text>
                    </View>
                    <View style={styles.form}>
                        <Form>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Email Anda</Label>
                                <Input onChangeText={ (text) => this.setState({ email : text })}/>
                            </Item>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Nama Lengkap Anda</Label>
                                <Input onChangeText={ (text) => this.setState({ name : text})}/>
                            </Item>
                            <Item picker>
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
                            </Item>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Umur Anda</Label>
                                <Input onChangeText={ (text) => this.setState({ age : text})}/>
                            </Item>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Alamat Anda</Label>
                                <Input onChangeText={ (text) => this.setState({ address : text})}/>
                            </Item>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Password Anda</Label>
                                <Input secureTextEntry={true} onChangeText={ (text) => this.setState({ password : text})}/>
                            </Item>
                            <Button style={styles.btn} onPress={this._signUPAsync.bind(this)}>
                                <Text style={styles.textWhite}>Daftar</Text>
                            </Button>
                            <Button style={styles.btnRegister} onPress={() => this.props.navigation.navigate('Login') }>
                                <Text style={styles.textWhite}>Masuk</Text>
                            </Button>
                        </Form>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
      backgroundColor: '#3F51B5',
      flexDirection : 'column',
      flex: 1,
      alignContent : 'center',
      alignSelf : 'stretch',
      justifyContent : 'space-between',
      padding : 25
    },
    textCenter : {
        textAlign :'center',
        alignItems : 'center',
        marginTop : 35
    },
    h2White : {
        color : 'white',
        fontSize : 18
    },
    h3White : {
        color : 'white',
        fontSize : 16,
        marginTop : 5
    },
    textWhite : {
        color : 'white'
    },
    form : {
        marginBottom : 95
    },
    btn : {
        backgroundColor : '#03A9F4',
        marginTop : 35,
        alignContent : 'center',
        alignItems : 'center',
        textAlign : 'center',
        justifyContent : 'center'
    },
    btnRegister : {
        backgroundColor : '#00BCD4',
        marginTop : 15,
        alignContent : 'center',
        alignItems : 'center',
        textAlign : 'center',
        justifyContent : 'center'
    },
    txtWhiteCenter : {
        color : 'white',
        textAlign : 'center'
    }
});

export default Register