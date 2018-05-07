import ethers from 'ethers';
import Provider from '../helpers/Provider';

import React, {Component} from 'react';
import {
  Box, Button, Card, Content, Heading,
  Columns, Column, Container
} from 'react-bulma-components';

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
              <Card>
                <Card.Header>
                  <Card.Header.Title>Transaction</Card.Header.Title>
                </Card.Header>

                <Card.Content>
                  <Content>
                    <div className="field">
                      <p className="control has-icons-left">
                        <input className="input" id="transactionToAddress" type="text" placeholder="To (Wallet address)" />
                        <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                      </p>
                    </div>

                    <div className="field">
                      <p className="control has-icons-left">
                        <input className="input" id="transactionAmount" type="text" placeholder="Value (Ether)" />
                        <span className="icon is-small is-left"><i className="fas fa-dollar-sign"></i></span>
                      </p>
                    </div>
                  </Content>
                </Card.Content>

                <Card.Footer>
                  <a href="#" className="card-footer-item" id="transactionSubmit">Transfer</a>
                </Card.Footer>
              </Card>
            </Columns.Column>

            <Columns.Column>
              <Card>
                <Card.Header>
                  <Card.Header.Title>Contract</Card.Header.Title>
                </Card.Header>

                <Card.Content>
                  <Content>
                    <div className="field">
                      <div className="file has-name is-fullwidth">
                        <label className="file-label">
                          <input className="file-input" type="file" id="contractFile" />
                          <span className="file-cta">
                            <span className="file-icon"><i className="fas fa-upload"></i></span>
                            <span className="file-label">Choose a file…</span>
                          </span>
                          <span className="file-name">...</span>
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <div className="select is-fullwidth">
                        <select id="contractListFunctions"></select>
                      </div>
                    </div>
                  </Content>
                </Card.Content>

                <Card.Footer>
                  <a href="#" className="card-footer-item" id="contractSubmit">Run</a>
                </Card.Footer>
              </Card>
            </Columns.Column>
          </Columns>
        </Container>
      )
  }
}
