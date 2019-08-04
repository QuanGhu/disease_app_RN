import React from 'react'
import  { View, Text, AsyncStorage } from 'react-native'
import { Container, Content, List, ListItem, Toast } from 'native-base'

class History extends React.Component {
    constructor() {
        super()
        this.state = {
            diagnoses : []
        }
    }

    componentDidMount = async () => {
        fetch('http://35.240.135.149/api/diagnose/list', {
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
                    diagnoses : responseJson.data
                })
            }
        })
        .catch((error) => {
            Toast.show({
                text: 'Call Administrator',
                buttonText: 'Ok',
                type : 'danger'
            })
        });
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.state.diagnoses.map( (data, i) => (
                            <ListItem key={i} button onPress={ () => this.props.navigation.navigate('Result',{id : data.id})}>
                                <Text>{data.created_at} - {data.result}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
        )
    }
}

export default History