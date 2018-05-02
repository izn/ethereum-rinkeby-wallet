import ethers from 'ethers';
const ProviderPromise = import('./Provider.js');

const Wallet = {
  activeWallet: null,

  inputFile: document.querySelector('#walletFile'),
  inputPasswd: document.querySelector('#walletPassword'),
  inputSubmit: document.querySelector('#walletSubmit'),
  statusWrapper: document.querySelector('#WalletConnectionStatus'),
  addressWrapper: document.querySelector('#walletAddress'),
  balanceWrapper: document.querySelector('#walletBalance'),

  init() {
    Wallet.inputSubmit.addEventListener('click', Wallet.import.bind(Wallet), false);
    Wallet.inputFile.addEventListener('change', () => (Wallet.inputFile.files.length && (Wallet.inputFile.innerHTML = Wallet.inputFile.files[0].name)));
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
    ethers.Wallet
          .fromEncryptedWallet(data, password)
          .then(async wallet => {
            document.querySelector('#step1').classList.add('is-hidden');
            document.querySelector('#step2').classList.remove('is-hidden');

            Wallet.activeWallet = wallet;    

            const Provider = await ProviderPromise;

            Wallet.activeWallet.provider = Provider.get();

            Wallet.addressWrapper.innerHTML = Wallet.activeWallet.address;

            Wallet.updateBalance();
          }).catch(e => Wallet.statusWrapper.innerHTML = e);
  },

  async updateBalance() {
    delete ProviderPromise.promise
    const Provider = await ProviderPromise;

    Provider.get()
            .getBalance(this.activeWallet.address)
            .then(balance => {
              let etherBalance = ethers.utils.formatEther(balance);
              Wallet.balanceWrapper.innerHTML = etherBalance;
            });
  }
};

module.exports = Wallet;