import ethers from 'ethers';
import Provider from '../helpers/Provider';

import React, {Component} from 'react';
import {
  Box, Button, Card, Content, Heading,
  Columns, Column, Container
} from 'react-bulma-components';

import Contract from '../components/Wallet/Contract';
import Transaction from '../components/Wallet/Transaction';

export default class Wallet extends Component {
  constructor(props) {
    super(props);

    this.wallet = this.props.location.state.wallet;

    this.state = {
      address: this.wallet.address,
      balance: ''
    }

    this.getBalance();
  }

  getBalance() {
    Provider.get()
            .getBalance(this.wallet.address)
            .then(balance => {
              let etherBalance = ethers.utils.formatEther(balance);
              this.setState({balance: etherBalance})
            });
  }

  render () {
      return (
        <Container>
          <Heading size={3}>Ethereum Web Wallet</Heading>

          <Columns>
            <Columns.Column>
              <Card>
                <Card.Header>
                  <Card.Header.Title>Wallet</Card.Header.Title>
                </Card.Header>

                <Card.Content>
                  <Content>
                    <p>Adress: {this.state.address}</p>
                    <p>Balance: {this.state.balance}</p>
                  </Content>
                </Card.Content>
              </Card>
            </Columns.Column>
          </Columns>

          <Columns>
            <Columns.Column>
              <Transaction />
            </Columns.Column>

            <Columns.Column>
              <Contract />
            </Columns.Column>
          </Columns>
        </Container>
      )
  }
}
