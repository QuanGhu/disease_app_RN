import React from 'react'
import { AsyncStorage, View } from 'react-native' 
import { Container, Content, List, ListItem, Text, Toast } from 'native-base'

class Result extends React.Component {
    constructor() {
        super()
        this.state = {
            result : "",
            causes : [],
            solutions : []
        }
    }
    componentDidMount = async () => {
        fetch('http://35.240.135.149/api/diagnose/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
            },
            body : JSON.stringify({
                id : this.props.navigation.getParam('id')
            })
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
                    result : responseJson.data.result,
                    causes : responseJson.data.causes,
                    solutions : responseJson.data.solution
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
        console.log(this.state)
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Gejala</Text>
                        </ListItem>
                        {this.state.causes.map(data => (
                            <View key={data.id}>
                                <ListItem>
                                    <Text>{data.cause}</Text>
                                </ListItem>
                            </View>
                        ))}                    
                        
                        <ListItem itemDivider>
                            <Text>Penyakit</Text>
                        </ListItem>
                        <ListItem>
                            <Text>{this.state.result}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Solusi</Text>
                        </ListItem>
                        {this.state.solutions.map(data => (
                            <View key={data.id}>
                                <ListItem>
                                    <Text>{data.name}</Text>
                                </ListItem>
                            </View>
                        ))}     
                    </List>
                </Content>
            </Container>
        )
    }
}

export default Result