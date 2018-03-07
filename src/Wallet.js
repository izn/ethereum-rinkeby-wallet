import ethers from 'ethers';
import Provider from './Provider.js';

const Wallet = {
  activeWallet: null,

  inputFile: document.querySelector('#walletFile'),
  inputPasswd: document.querySelector('#walletPassword'),
  inputSubmit: document.querySelector('#walletSubmit'),
  statusWrapper: document.querySelector('#WalletConnectionStatus'),
  addressWrapper: document.querySelector('#walletAddress'),
  balanceWrapper: document.querySelector('#walletBalance'),

  init() {
    this.inputSubmit.addEventListener('click', this.import, false);
  },

  import() {
    let file = Wallet.inputFile.files[0];

    const reader = new FileReader();
    reader.onload = e => {
      Wallet.unlock(e.target.result);
    };

    reader.readAsText(file);
  },

  unlock(data) {
    let password = this.inputPasswd.value;

    Wallet.statusWrapper.innerHTML = "Connecting...";

    // Opening wallet
    ethers.Wallet.fromEncryptedWallet(data, password).then(wallet => {
      // Bad code, but who cares?
      document.querySelector('#step1').style.display = 'none';
      document.querySelector('#step2').style.display = 'block';

      Wallet.activeWallet = wallet;
      Wallet.activeWallet.provider = Provider.get();

      Wallet.addressWrapper.innerHTML = Wallet.activeWallet.address;

      Wallet.updateBalance();
    }).catch(e => {
      Wallet.statusWrapper.innerHTML = e;
    });
  },

  updateBalance() {
    Provider.get().getBalance(this.activeWallet.address).then(balance => {
      let etherBalance = ethers.utils.formatEther(balance);
      Wallet.balanceWrapper.innerHTML = etherBalance;
    });
  }
};

export default Wallet;
