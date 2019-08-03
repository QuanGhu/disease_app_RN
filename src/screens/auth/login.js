import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Container, Form, Item, Input, Label, Button} from 'native-base'

class Login extends React.Component {
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
                                <Input />
                            </Item>
                            <Item floatingLabel last style={styles.textWhite}>
                                <Label style={styles.textWhite}>Masukan Password Anda</Label>
                                <Input />
                            </Item>
                            <Button style={styles.btn}>
                                <Text style={styles.textWhite}>Masuk</Text>
                            </Button>
                            <Button style={styles.btnRegister}>
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