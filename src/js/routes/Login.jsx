import ethers from 'ethers';

import React, {Component} from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  importWallet() {
    const reader = new FileReader();
    let file = this.inputFile.files[0];

    reader.onload = e => {
      this.unlockWallet(e.target.result);
    };

    reader.readAsText(file);
  }

  unlockWallet(data) {
    let password = this.inputPassword.value;

    ethers.Wallet
          .fromEncryptedWallet(data, password)
          .then(async wallet => {
            browserHistory.push({pathname: '/wallet', state: { wallet: wallet }});
          }).catch(e => {
            this.setState({
              status: e.toString(),
              loading: false
            })
          });
  }

  handleSubmit(event) {
    this.setState({
      status: '',
      loading: true
    });

    this.importWallet();
    event.preventDefault();
  }

  render () {
      return (
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title">Ethereum Web Wallet</h3>
                <p className="subtitle has-text-grey">Import your JSON Wallet.</p>
                <div className="box">
                  <form id="walletForm" method="get" action="/" onSubmit={this.handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <div className="file has-name is-fullwidth">
                          <label className="file-label">
                            <input
                              type="file"
                              className="file-input"
                              id="walletFile"
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
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          type="password"
                          id="walletPassword"
                          className="input"
                          placeholder="Your Password"
                          ref={(input) => this.inputPassword = input}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="walletSubmit"
                      className={`button is-block is-info is-fullwidth ${this.state.loading ? 'is-loading' : ''}`}  >
                      Submit
                    </button>

                    <p id="WalletConnectionStatus">{this.state.status}</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
  }
}
