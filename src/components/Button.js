import React from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        color: '#888',
        textAlign: "center",
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: "#888"
    },
    operationButton: {
        color: '#FFF',
        backgroundColor: '#1E90FF'
    },
    equalsButton: {
        color: '#FFF',
        backgroundColor: '#4169E1'
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    }
})

export default props => {

    const stylesButton = [styles.button]

    if(props.double){stylesButton.push(styles.buttonDouble)}
    if(props.triple){stylesButton.push(styles.buttonTriple)}
    if(props.operation){stylesButton.push(styles.operationButton)}
    if(props.equals){stylesButton.push(styles.equalsButton)}

    return(
        <TouchableHighlight onPress={props.onClick}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}