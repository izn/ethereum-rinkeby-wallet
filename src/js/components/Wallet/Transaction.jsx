import ethers from 'ethers';
import Provider from '../../helpers/Provider';

import React, { Component } from 'react';
import { Card, Content, Heading } from 'react-bulma-components';

export default class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: this.props.wallet
    }

    this.sendTransaction = this.sendTransaction.bind(this);
  }

  sendTransaction() {
    let targetAddress = ethers.utils.getAddress(this.inputAddress.value);
    let amountWei = ethers.utils.parseEther(this.inputAmount.value);

    this.state.wallet.send(targetAddress, amountWei).then(() => {
      window.alert('Success!');
    });
  }

  render () {
      return (
        <Card>
          <Card.Header>
            <Card.Header.Title>Transaction</Card.Header.Title>
          </Card.Header>

          <Card.Content>
            <Content>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    placeholder="To (Wallet address)"
                    ref={input => {
                      this.inputAddress = input;
                    }}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    placeholder="Value (Ether)"
                    ref={input => {
                      this.inputAmount = input;
                    }}
                  />
                  <span className="icon is-small is-left"><i className="fas fa-dollar-sign"></i></span>
                </p>
              </div>
            </Content>
          </Card.Content>

          <Card.Footer>
            <Card.Footer.Item>
              <a href="#" onClick={this.sendTransaction}>Transfer</a>
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      )
  }
}
