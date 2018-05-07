import ethers from 'ethers';
import Provider from '../helpers/Provider';

import React, {Component} from 'react';

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
        <div className="container">
          <h1 className="title">Ethereum Web Wallet</h1>

          <div className="columns">
            <div className="column">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    Wallet
                  </p>
                </header>

                <div className="card-content">
                  <div className="content">
                    <p>Adress: <span id="walletAddress">{this.state.address}</span></p>
                    <p>Balance: <span id="walletBalance">{this.state.balance}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    Transaction
                  </p>
                </header>

                <div className="card-content">
                  <div className="content">
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
                  </div>
                </div>

                <footer className="card-footer">
                  <a href="#" className="card-footer-item" id="transactionSubmit">Transfer</a>
                </footer>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    Contract
                  </p>
                </header>

                <div className="card-content">
                  <div className="content">
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
                  </div>
                </div>

                <footer className="card-footer">
                  <a href="#" className="card-footer-item" id="contractSubmit">Run</a>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
