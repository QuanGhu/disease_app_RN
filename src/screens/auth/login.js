import React from 'react'
import { View, Text, StyleSheet, AsyncStorage} from 'react-native'
import { Container, Form, Item, Input, Label, Button, Toast} from 'native-base'
import axios from 'axios'
class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email : "",
            password : "",
            user_level_id : 2
        }
    }
    _signInAsync = async () => {
        console.log(this.state)
        axios({
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            url : 'http://35.240.135.149/api/login',
            data : this.state
        })
        .then(function (response) {
            AsyncStorage.setItem('token', response.data.token);
            this.props.navigation.navigate('App');
        })
        .catch(function (error) {
            if(error.response.data.errors)
            {
                error.response.data.errors.map( err => {
                    Toast.show({
                        text: err,
                        buttonText: 'Ok',
                        type : 'danger'
                    })
                })
            } else {
                Toast.show({
                    text: error.response.data.message,
                    buttonText: 'Ok',
                    type : 'danger'
                })
            }
        })
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
                                <Input onChangeText={ (text) => this.setState({ email : text}) } value={this.state.email}/>
                            </Item>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Password Anda</Label>
                                <Input secureTextEntry={true} onChangeText={ (text) => this.setState({ password : text }) } value={this.state.password}/>
                            </Item>
                            <Button style={styles.btn} onPress={this._signInAsync}>
                                <Text style={styles.textWhite}>Masuk</Text>
                            </Button>
                            <Button style={styles.btnRegister} onPress={ () => this.props.navigation.navigate('Register') }>
                                <Text style={styles.textWhite}>Daftar</Text>
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

export default Login