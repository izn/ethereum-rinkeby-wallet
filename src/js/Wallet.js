import ethers from 'ethers';
const ProviderPromise = import('./Provider.js');

const Wallet = {
  activeWallet: null,

  form: document.querySelector('#walletForm'),
  inputFile: document.querySelector('#walletFile'),
  inputPasswd: document.querySelector('#walletPassword'),
  inputSubmit: document.querySelector('#walletSubmit'),
  statusWrapper: document.querySelector('#WalletConnectionStatus'),
  addressWrapper: document.querySelector('#walletAddress'),
  balanceWrapper: document.querySelector('#walletBalance'),

  init() {
    Wallet.form.addEventListener('submit', (e) => {
      e.preventDefault();
      Wallet.import();
    });

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

    this.inputSubmit.classList.add('is-loading');

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
          }).catch(e => {
            this.inputSubmit.classList.remove('is-loading');
            Wallet.statusWrapper.innerHTML = e;
          });
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