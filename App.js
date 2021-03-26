import React, { Component } from 'react';
import { SafeAreaView , View , Text, StyleSheet , StatusBar } from 'react-native'

//Components
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class App extends Component {

  //Operador Spread: cria uma cópia usando os mesmos atributos do objeto passado
  state = {...initialState} 

  addDigit = n => {
    
    //Caso possua apenas um zero no display o valor de 'clearDisplay' será true ou
    //caso o valor do estado de clearDisplay for true a constante clearDisplay será true também
    const clearDisplay = (this.state.displayValue === '0' || this.state.clearDisplay)

    //Verifica se o ponto foi incluido, se sim, não inclui novamente
    if((n === '.') && !clearDisplay && this.state.displayValue.includes('.')){
      return
    }

    //Se a constante 'clearDisplay' for true a const 'currentValue' será uma string vazia
    //caso contrário ela receberá o valor do estado 'displayValue'
    const currentValue = clearDisplay ? '' : this.state.displayValue

    //Concatena o valor da constante 'currentValue' com o número passado na função
    const displayValue = currentValue + n

    //Armazena o valor já concatenado no estado
    this.setState({ displayValue, clearDisplay: false })

    //Se o valor digitado for diferente de '.', atualiza o estado de 'values'
    if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }

  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if(this.state.current === 0){
      this.setState({ operation, clearDisplay: true, current: 1 })
    }else{
      const equals = (operation === '=')
      const values = [...this.state.values]
      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      }) 
    }
  }

  render() {
    return (
      <>
      <StatusBar
        barStyle = "light-content"
        hidden = {false}
        backgroundColor = "#1E90FF"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
      <SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue}></Display>
        <View style={styles.buttons}>
          <Button label={'AC'} triple onClick={this.clearMemory}></Button>
          <Button label={'/'} operation onClick={() => this.setOperation('/')}></Button>
          <Button label={'7'} onClick={() => this.addDigit('7')}></Button>
          <Button label={'8'} onClick={() => this.addDigit('8')}></Button>
          <Button label={'9'} onClick={() => this.addDigit('9')}></Button>
          <Button label={'*'} operation onClick={() => this.setOperation('*')}></Button>
          <Button label={'4'} onClick={() => this.addDigit('4')}></Button>
          <Button label={'5'} onClick={() => this.addDigit('5')}></Button>
          <Button label={'6'} onClick={() => this.addDigit('6')}></Button>
          <Button label={'-'} operation onClick={() => this.setOperation('-')}></Button>
          <Button label={'1'} onClick={() => this.addDigit('1')}></Button>
          <Button label={'2'} onClick={() => this.addDigit('2')}></Button>
          <Button label={'3'} onClick={() => this.addDigit('3')}></Button>
          <Button label={'+'} operation onClick={() => this.setOperation('+')}></Button>
          <Button label={'0'} double onClick={() => this.addDigit('0')}></Button>
          <Button label={'.'} onClick={() => this.addDigit('.')}></Button>
          <Button label={'='} equals onClick={() => this.setOperation('=')}></Button>       
        </View>
      </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  }

})
