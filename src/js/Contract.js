import ethers from 'ethers';
import Wallet from './Wallet.js';
import Provider from './Provider.js';

const Contract = {
  activeContract: null,
  abi: null,

  inputFile: document.querySelector('#contractFile'),
  inputSubmit: document.querySelector('#contractSubmit'),

  init() {
    this.inputSubmit.addEventListener('click', this.import, false);
  },

  import() {
    let file = Contract.inputFile.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      Contract.abi = JSON.parse(e.target.result).abi;
      Contract.send();
    };

    reader.readAsText(file);
  },

  send() {
    this.activeContract = new ethers.Contract(Wallet.activeWallet.address, Contract.abi, Provider.get());
  }
};

export default Contract;