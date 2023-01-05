import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/buttons/Button'
import Display from '../components/display/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,

}



class Calculator extends Component {

    constructor(props) {
        super(props)

        this.clear = this.clear.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    state = { ...initialState }

    clear() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation;
            const values = [...this.state.values]

            switch (currentOperation) {
                case '/':
                    values[0] = values[0] / values[1]
                    break;
                case '+':
                    values[0] = values[0] + values[1]
                    break;
                case '-':
                    values[0] = values[0] - values[1]
                    break;
                case '*':
                    values[0] = values[0] * values[1]
                    break;
                case '=':
                    values[0] = this.statevalues[0]
                    break;
            }

            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operations: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;

        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current;

            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })

        }
    }


    render() {
        return (
            <div className='calculator'>
                <Display value={this.state.displayValue} />

                <Button click={this.clear} triple label="AC" />
                <Button operation click={this.setOperation} label="/" />

                <Button click={this.addDigit} label="7" />
                <Button click={this.addDigit} label="8" />
                <Button click={this.addDigit} label="9" />
                <Button operation click={this.setOperation} label="*" />

                <Button click={this.addDigit} label="4" />
                <Button click={this.addDigit} label="5" />
                <Button click={this.addDigit} label="6" />
                <Button operation click={this.setOperation} label="-" />

                <Button click={this.addDigit} label="1" />
                <Button click={this.addDigit} label="2" />
                <Button click={this.addDigit} label="3" />
                <Button operation click={this.setOperation} label="+" />

                <Button click={this.addDigit} double label="0" />
                <Button click={this.addDigit} label="." />
                <Button operation click={this.setOperation} label="=" />
            </div>
        )
    }

}

export default Calculator