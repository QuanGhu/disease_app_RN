import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Container, Card } from 'native-base';

export default class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      causes: [],
      selectedCause: []
    }
  }

  press = (hey) => {
    this.state.causes.map((item) => {
      if (item.id === hey.id) {
        item.check = !item.check
        if (item.check === true) {
          this.state.selectedCause.push(item);
        } else if (item.check === false) {
          const i = this.state.selectedCause.indexOf(item)
          if (1 != -1) {
            this.state.selectedCause.splice(i, 1)
            return this.state.selectedCause
          }
        }
      }
    })
    this.setState({causes: this.state.causes})
  }

  _showSelectedCause() {
    return this.state.selectedCause.length;
  }

  componentDidMount = async () => {
    fetch('http://35.240.135.149/api/cause/all', {
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
                causes : responseJson.data
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

  renderHeader = () => {
    return <Header/>
  };

  analyze = async () => {
      console.log(this.state.selectedCause)
      arrSent = []
      this.state.selectedCause.map((data, i) => {
        arrSent.push(data.id)
      })
      fetch('http://35.240.135.149/api/diagnose/process', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${await AsyncStorage.getItem('token')}`
            },
            body : JSON.stringify({
                causes_id : arrSent
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
                Toast.show({
                    text: responseJson.message,
                    buttonText: 'Ok',
                    type : 'success'
                })
            }
        })
        .catch((error) => {
            console.log(error)
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
        <Card style={{ padding : 15}}>
            <View style={styles.storyContainer}>
            <FlatList data={this.state.causes} ListHeaderComponent={this.renderHeader} keyExtractor={(item, index) => `list-item-${index}`} extraData={this.state} renderItem={({item}) => {
                return <TouchableOpacity style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#ecf0f1'
                }} onPress={() => {
                this.press(item)
                }}>
                <View style={{
                    flex: 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    {item.check
                    ? (
                        <Text style={{
                        fontWeight: 'bold'
                        }}>{`${item.name} ${item.name}`}</Text>
                    )
                    : (
                        <Text>{`${item.name} ${item.name}`}</Text>
                    )}
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}>
                    {item.check
                    ? (
                        <Icon name="ios-checkbox" size={30} color={primaryColor}></Icon>
                    )
                    : (
                        <Icon name="ios-square-outline" size={30} color={darkGrey}></Icon>
                    )}
                </View>
                </TouchableOpacity>
            }}/>
            </View>
            <View>
            {(this.state.selectedCause.length > 1)
                ? (
                    <View style={{
                        flex: 1,
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop : 70
                        }}>
                            <Button onPress={this.analyze.bind(this)} style={{justifyContent: 'center', marginTop : 15}} info>
                                <Text style={ { textAlign : 'center', color : 'white'}}> Analisa </Text>
                            </Button>
                    </View>
                )
                : null
                }
            </View>
        </Card>
      </Container>
    );
  };
};

const primaryColor = "#1abc9c";
const lightGrey = "#ecf0f1";
const darkGrey = "#bdc3c7";

const Header = () => (
    <View style={{ flex : 1, alignItems: 'stretch',
            justifyContent: 'center',
            alignContent: 'center'}}>
        <Text style={{ textAlign : 'center', fontSize : 20, fontWeight : 'bold'}}> Pilih lah gejala dibawah ini yang kamu rasakan </Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 0
  },
  containerFooter: {
    height: 50,
    backgroundColor: '#1abc9c',
    padding: 5,
    flexDirection: 'row'
  },
  searchContainer: {
    flex: 1,
    padding: 5,

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1'
  }
});