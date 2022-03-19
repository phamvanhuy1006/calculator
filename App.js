import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            resultText: "",
            calculateText: ""
        }
        this.operations = ['C','Del','%','/', '*', '+', '-', '=']
    } 

    calculateResult() {
        const text = this.state.resultText
        this.setState({
            calculateText: eval(text)})
    }

    validate() {
        const text = this.state.resultText
        switch(text.slice(-1)) {
            case '+':
            case '-':
            case '*':
            case '/':
                return false
        }
        return true
    }

    buttonPressed(text) {
        this.setState({
            resultText: this.state.resultText+text
        })
    }

    operate(operation) {
        switch(operation) {
            case 'Del': 
                let text = this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText: text.join('')
                })
                break
            case '=': return this.validate() && this.calculateResult()
            case 'C': 
                this.setState({
                    resultText: "",
                    calculateText: ""
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':
                const lastChar = this.state.resultText.split('').pop()

                if(this.operations.indexOf(lastChar) > 0) return

                if(this.state.text =="") return
                this.setState({
                    resultText: this.state.resultText + operation
                })
            
        }
    }

    render() {
        let rows = []
        let ctrl = []
        let controll = ['C','Del','%']
        for(let i = 0; i < 3; i++) {
            ctrl.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(controll[i])}>
                <Text style={[styles.btnText, styles.colorBrown]}>{controll[i]}</Text>
            </TouchableOpacity>)
        }
        rows.push(<View style={styles.row}>{ctrl}</View>)

        let nums = [[7,8,9], [4,5,6], [1,2,3], [0,'','.']]
        for(let i = 0; i < 4; i++) {
            let row = []
            for(let j = 0; j < 3; j++) {
                row.push(<TouchableOpacity onPress={() =>this.buttonPressed(nums[i][j])} style={styles.btn}>
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                </TouchableOpacity>)
            }
            rows.push(<View style={styles.row}>{row}</View>)
        }

        let operations = ['/', '*', '+', '-', '=']
        let ops = []
        for(let i = 0; i < 5; i++) {
            ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(operations[i])}>
                <Text style={[styles.btnText, styles.colorBrown]}>{operations[i]}</Text>
            </TouchableOpacity>)
        }

        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>{this.state.calculateText}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
                {/* <StatusBar style="auto" /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 30
    },
    result: {
        flex: 2,
        backgroundColor: 'red',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    resultText: {
        fontSize: 30,
        color: 'white',
    },
    calculation: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
    },
    calculationText: {
        fontSize: 24,
        color: 'white',
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: 'yellow'
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'black'
    },
    colorBrown: {
        color: 'brown'
    }

});
