import React, {Component} from 'react';
import {
  Card, Content, Heading
} from 'react-bulma-components';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
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
            <Card.Footer.Item>
              <a href="#">Transfer</a>
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      )
  }
}
