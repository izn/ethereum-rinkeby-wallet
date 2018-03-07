import ethers from 'ethers';

const Provider = {
  token: '',
  network: ethers.providers.networks.rinkeby,

  get() {
    return new ethers.providers.InfuraProvider(this.network, this.token);
  }
};

export default Provider;