import ethers from 'ethers';
import Provider from '../../helpers/Provider';

import React, { Component } from 'react';
import { Card, Content, Heading } from 'react-bulma-components';

export default class Contract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: this.props.wallet
    };

    this.importContract = this.importContract.bind(this);
  }

  importContract() {
    let file = this.inputFile.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      this.setState({
        abi: JSON.parse(e.target.result).abi
      });

      this.loadContract();
    };

    reader.readAsText(file);
  }

  loadContract() {
    let activeContract = new ethers.Contract(this.state.wallet.address, this.state.abi, Provider.get());

    this.functionsList = []

    for (let func in activeContract) {
      this.functionsList.push(
        <option>{func}</option>
      );
    }
  }

  render () {
      return (
        <Card>
          <Card.Header>
            <Card.Header.Title>Contract</Card.Header.Title>
          </Card.Header>

          <Card.Content>
            <Content>
              <div className="field">
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input
                      type="file"
                      className="file-input"
                      ref={input => {
                        this.inputFile = input;
                      }}
                    />
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
                  <select>
                    {this.functionsList}
                  </select>
                </div>
              </div>
            </Content>
          </Card.Content>

          <Card.Footer>
            <Card.Footer.Item>
              <a href="#" onClick={this.importContract}>Load</a>
            </Card.Footer.Item>
          </Card.Footer>
        </Card>
      )
  }
}
