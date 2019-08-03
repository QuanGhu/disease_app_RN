import React from 'react'
import  { View, Text } from 'react-native'
import { Container, Content, List, ListItem } from 'native-base'

class History extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem button>
                            <Text>4 Agustus 2019 15:10</Text>
                        </ListItem>
                        <ListItem button>
                            <Text>4 Agustus 2019 15:15</Text>
                        </ListItem>
                        <ListItem button>
                            <Text>4 Agustus 2019 16:20</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default History