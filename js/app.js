const Provider = {
  token: '', // need token? go to infura.io
  network: ethers.providers.networks.rinkeby,

  get() {
    return new ethers.providers.InfuraProvider(this.network, this.token);
  }
};

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
      Wallet.unlock(e.target.result)
    }

    reader.readAsText(file);
  },

  unlock(data) {
    let password = this.inputPasswd.value;

    Wallet.statusWrapper.innerHTML = "Connecting..."

    // Opening wallet
    const walletPromise = ethers.Wallet.fromEncryptedWallet(data, password).then(wallet => {
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

var Signer = {
  custom: function(transaction) {
    let sign = Wallet.activeWallet.sign(transaction);

    return {
      'getAddress' : Wallet.activeWallet.address,
      'provider' : Provider.get(),
      'sign' : resolve(sign)
    }
  }
};

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
      alert('Success!');
    });
  }
};

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

Wallet.init();
Transaction.init();
Contract.init();
