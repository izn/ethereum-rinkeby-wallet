import ethers from 'ethers';
import Wallet from './Wallet.js';

const Transaction = {
  inputSubmit: document.querySelector('#transactionSubmit'),
  inputAddress: document.querySelector('#transactionToAddress'),
  inputAmount: document.querySelector('#transactionAmount'),

  init() {
    this.inputSubmit.addEventListener('click', this.send.bind(this), false);
  },

  send() {
    let targetAddress = ethers.utils.getAddress(this.inputAddress.value);
    let amountWei = ethers.utils.parseEther(this.inputAmount.value);

    Wallet.activeWallet.send(targetAddress, amountWei).then(() => {
      window.alert('Success!');
    });
  }
};

export default Transaction;