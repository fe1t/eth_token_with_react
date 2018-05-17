import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Web3 from 'web3'
import { ABI, ContractAddress } from './ContractDetail'

class App extends Component {
  state = {
    userAccount: undefined,
    myToken: undefined
  }

  async componentWillMount() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    window.web3 = this.web3
    this.setState({
      userAccount: this.web3.eth.accounts[0],
      myToken: this.web3.eth.contract(ABI).at(ContractAddress)
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  handleOnClick = async e => {
    // console.log(this.web3.eth.accounts[0])
    const toAddress = document.querySelector('input[name=to]').value
    console.log(toAddress)
    const ret = this.state.myToken.transfer(toAddress, 1, { from: this.state.userAccount })
    console.log(ret)
    // const balance = await this.state.myToken.methods.balanceOf(this.state.userAccount)
    // console.log(balance)
  }

  render() {
    if (!this.state.userAccount) return null
    return (
      <form onSubmit={this.handleSubmit}>
        FromAddress: <input type="text" name="from" value={this.state.userAccount} disabled /> <br />
        ToAddress: <input type="text" name="to" /> <br />
        <input type="submit" value="Submit" onClick={this.handleOnClick} />
      </form>
    )
  }
}

export default App
