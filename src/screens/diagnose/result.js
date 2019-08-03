import React from 'react'
import { Container, Content, List, ListItem, Text } from 'native-base'

class Result extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text>Gejala</Text>
                        </ListItem>                    
                        <ListItem>
                            <Text>Buang Air Terus Terusan</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Badan Lesu</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Penyakit</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Diare</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Solusi</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Minum Oralit</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default Result